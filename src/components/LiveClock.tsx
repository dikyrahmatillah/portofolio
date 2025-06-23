import { Component, ReactNode } from "react";
import React from "react";

interface LiveClockState {
  time: Date;
  mounted: boolean;
}

class LiveClock extends Component<{}, LiveClockState> {
  timerID?: NodeJS.Timeout;

  constructor(props: {}) {
    super(props);

    this.state = {
      mounted: false,
      time: new Date(),
    };
  }

  componentDidMount() {
    this.setState({ mounted: true });
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount(): void {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      time: new Date(),
    });
  }

  render(): ReactNode {
    // Only render the clock after the component has mounted (client-side)
    if (!this.state.mounted) {
      return null;
    }
    return <p>{this.state.time.toLocaleTimeString()}</p>;
  }
}

export default LiveClock;
