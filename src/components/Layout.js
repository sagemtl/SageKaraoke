import React, { PureComponent } from 'react';
import CountdownTimer from './videopage';

class Layout extends PureComponent {
  render() {
    return (
      <div>
        <CountdownTimer />
        <h1>Hello</h1>
      </div>
    );
  }
}

export default Layout;
