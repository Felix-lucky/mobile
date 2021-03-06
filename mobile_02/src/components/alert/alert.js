import React, { Component } from 'react';
import { is, fromJS } from 'immutable';

import styles from './alert.less';

class alert extends Component {

    handleConfirm=()=>{
        setTimeout(()=>{
            this.props.closeAlert();
        },300);
    }

    shouldComponentUpdate(nextPorps,nextState){
        return !is(fromJS(this.props),fromJS(nextPorps)) || !is(fromJS(this.state),fromJS(nextState));
    }

    render() {
        const {alertStatus, alertContext,} = this.props;
        return (
            <div>
                {alertStatus && <div className={styles.alert_container}>
                    <div className={styles.alert_context}>
                        <div className={styles.context_item}>{alertContext}</div>
                        <a className={styles.alert_btn} onTouchEnd={this.handleConfirm}>确认</a>
                    </div>
                </div>}
            </div>
        );
    }
}

export default alert;