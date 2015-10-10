import React from 'react';
import classes from 'classnames';
import paramCase from 'param-case';
import PropTypes from 'baobab-react/prop-types';
import { defer } from 'lodash';

const animationDuration = 250;

export default function modalDecorator(eventName) {
  return (Component) => {
    return class Modal extends React.Component {
      static contextTypes = {
        tree: PropTypes.baobab
      };

      constructor(props, context) {
        super(props, context);

        this.state = {
          active: !!props.active,
          opening: false,
          closing: false
        };

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
      }

      componentDidMount() {
        this.context.tree.on(eventName, this.open);
      }

      componentWillUnmount() {
        this.context.tree.off(eventName, this.open);
        this.isUnmounting = true;
      }

      defer(cb) {
        defer(() => setTimeout(cb, 10));
      }

      open() {
        let args = Array.prototype.slice.call(arguments);
        this.setState({ opening: true });
        this.defer(this.handleTransition.bind(this, args));
      }

      close() {
        let args = Array.prototype.slice.call(arguments);
        this.setState({ active: false, closing: true });
        this.defer(this.handleTransition.bind(this, args));
      }

      handleTransition(args) {
        if (this.isUnmounting) return;

        let { child } = this.refs;
        let { opening } = this.state;
        let callback = opening ? child.onOpen : child.onClose;

        if (typeof callback === 'function') {
          callback.apply(child, args);
        }

        if (opening) {
          this.setState({
            active: true,
            opening: false
          });
        } else {
          setTimeout(() => {
            if (this.isUnmounting) return;

            this.setState({
              active: false,
              closing: false
            });
          }, animationDuration);
        }
      }

      stopPropagation(e) {
        e.stopPropagation();
      }

      render() {
        let { active, opening, closing } = this.state;
        let className = classes('modal', 'full-mask', { active });
        let id = paramCase(Component.modalName);

        let shouldRenderComponent = active || opening || closing;

        return shouldRenderComponent
          ? <div id={ id } className={ className } onKeyDown={ this.stopPropagation }>
              <Component ref='child' closeModal={ this.close } { ...this.props }/>
            </div>
          : null;
      }
    };
  };
}
