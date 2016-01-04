import React from 'react';
import a, { EXAMPLE_MODAL_OPEN } from '../constants/events';
import { modal } from '../decorators';

console.log(a, EXAMPLE_MODAL_OPEN);

@modal(EXAMPLE_MODAL_OPEN)

export default class ExampleModal extends React.Component {
  static modalName = 'ExampleModal';

  onOpen() {
    console.log('Modal opened.');
  }

  render() {
    const { closeModal } = this.props;

    return (
      <aside>
        <div onClick={ closeModal }>Close modal</div>
        <p>This is an example modal.</p>
      </aside>
    );
  }
}
