import React, { Component } from 'react';

class Entity extends Component {
  state = {
    entityKey: this.props.entityKey,
  }

  componentWillMount () {
    const contentState = this.props.contentState;
    const entity = contentState.getEntity(this.props.entityKey);
    const { entityKey } = entity.getData();

    this.setState({ entityKey });
  }

  componentWillReceiveProps (nextProps) {
    // https://git.io/vdbak
    if (nextProps.entityKey !== this.props.entityKey) {
      const contentState = this.props.contentState;
      const entity = contentState.getEntity(nextProps.entityKey);
      const { entityKey } = entity.getData();

      this.setState({ entityKey });
    }
  }

  componentWillUnmount () {
    console.log('unmounting entity', this.props.entityKey);
  }

  render () {
    return <span contentEditable={false}>entity {this.state.entityKey}{this.props.children}</span>;
  }
}

export default Entity;
