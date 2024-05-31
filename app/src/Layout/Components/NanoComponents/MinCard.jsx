import React, { Component } from 'react';

class MinCard extends Component {
    render() {
        const css = `h-32 w-full ${this.props.colour} rounded-md px-[16px] py-[12px]`
        return (
            <div className= {css}>
                <h1 className='text-lg font-normal'>{this.props.title}</h1>
                <h1 className='mt-2 text-4xl font-semibold'>{this.props.number}</h1>
                {/* <h1 className='text-right text-sm text-blue-400'> View</h1> */}
            </div>
        );
    }
}

export default MinCard;
