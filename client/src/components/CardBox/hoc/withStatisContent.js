import React, { Component } from 'react';

export default function (WithStaticContent) {
    return class extends Component {
        render() {
            const children = (
                <>
                    <h2>{this.props.title}</h2>
                    <p>{this.props.content}</p>
                </>
            )
            return (
                < WithStaticContent
                    {...this.props}
                    children={children}
                    CARDBOX_USER={this.props.userName}
                    CARDBOX_DATE={this.props.date}
                    CARDBOX_CATEGORY={this.props.category}
                    CARDBOX_LEVEL={this.props.level}
                    CARDBOX_COMMENTS={this.props.commentsLength}
                />
            );
        }
    }
}
