import React, { Component } from 'react';

export default function (WithDynamicContext) {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                title: "",
                context: ""
            }
        }
        render() {

            const children = (
                <>
                    <input placeholder="Title"></input>
                    <textarea placeholder="Please share with us your knowledge"></textarea>
                </>
            )

            return <WithDynamicContext
                {...this.props}
                children={children}
                CARDBOX_USER={localStorage.getItem('userName')}
                CARDBOX_DATE={new Date().toLocaleDateString()}
                CARDBOX_CATEGORY={this.props.categoryChecked}
                CARDBOX_LEVEL={this.props.levelChecked}
            />
        }
    }
}