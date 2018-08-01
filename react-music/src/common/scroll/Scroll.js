import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import BScroll from 'better-scroll';
import PropTypes from 'prop-types';
import './scroll.styl';

class Scroll extends React.Component {
    componentDidUpdate () { //当state发生改变， 组件需要更新
        if(this.bScroll && this.props.refresh === true) {
            this.bScroll.refresh();
        }
    }
    componentWillUnmount () { 
        this.bScroll.off('scroll'); //垃圾回收
        this.bScroll = null;

    }
    componentDidMount () {
        this.scrollView = ReactDOM.findDOMNode(this.refs.scrollView);
        if(!this.bScroll) {
            this.bScroll = new BScroll(this.scrollView, {
                probeType: 3,
                click: this.props.click //bscroll的实例化

            });
            if(this.props.onScroll) {
                this.bScroll.on('scroll', (scroll) => {
                    this.props.onScroll(scroll);
                })
            }
        }
    }
    refresh () {
        if(this.bScroll) {
            this.bScroll.refresh();
        }
    }
    render () {
        return (
            <div className="scroll-view" ref="scrollView">
                { this.props.children }
            </div>
        )
    }
}
Scroll.defaultProps = {
    click: true,
    reflesh: false,
    onScroll: null
}

Scroll.propTypes = {
    click: PropTypes.bool,
    refresh: PropTypes.bool,
    onScroll: PropTypes.func
}
export default Scroll;
