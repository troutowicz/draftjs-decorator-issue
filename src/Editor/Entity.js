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
    if (nextProps.entityKey !== this.props.entityKey) {
      console.log('new entity key', nextProps.entityKey);
      console.log('old entity key', this.props.entityKey);
    }
  }

  componentWillUnmount () {
    console.log('unmounting entity', this.props.entityKey);
  }

  render () {
    return <span contentEditable={false}>entity {this.state.entityKey}</span>;
  }
}

export default Entity;
