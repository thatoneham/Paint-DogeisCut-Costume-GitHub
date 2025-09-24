import React from 'react';
import {FormattedMessage, injectIntl} from 'react-intl';

import styles from './stroke-style-picker.css';

import LabeledIconButton from '../labeled-icon-button/labeled-icon-button.jsx';
import Dropdown from '../dropdown/dropdown.jsx';
import Button from '../button/button.jsx';
import InputGroup from '../input-group/input-group.jsx';

import BufferedInputHOC from '../forms/buffered-input-hoc.jsx';
import Input from '../forms/input.jsx';

const BufferedInput = BufferedInputHOC(Input);

class StrokeStylePickerComponent extends React.Component {
    render () {
        return (
            <div
                className={styles.colorPickerContainer}
                dir={this.props.rtl ? 'rtl' : 'ltr'}
            >
                <div className={styles.row}>
                    <div className={styles.rowHeader}>
                        <span className={styles.labelName}>
                            <FormattedMessage
                                defaultMessage="Join"
                                description="Label for the join component in the style picker"
                                id="paint.paintEditor.join"
                            />
                        </span>
                        <LabeledIconButton
                            className={styles.swapButton}
                            //imgSrc={swapIcon}
                            title={"Bevel"}
                            onClick={function(){}}
                        />
                        <LabeledIconButton
                            className={styles.swapButton}
                            //imgSrc={swapIcon}
                            title={"Round"}
                            onClick={function(){}}
                        />
                        <LabeledIconButton
                            className={styles.swapButton}
                            //imgSrc={swapIcon}
                            title={"Miter"}
                            onClick={function(){}}
                        />
                    </div>
                    <div className={styles.rowHeader}>
                        <span className={styles.labelName}>
                            <FormattedMessage
                                defaultMessage="Cap"
                                description="Label for the cap component in the style picker"
                                id="paint.paintEditor.cap"
                            />
                        </span>
                        <LabeledIconButton
                            className={styles.swapButton}
                            //imgSrc={swapIcon}
                            title={"Butt"}
                            onClick={function(){}}
                        />
                        <LabeledIconButton
                            className={styles.swapButton}
                            //imgSrc={swapIcon}
                            title={"Round"}
                            onClick={function(){}}
                        />
                        <LabeledIconButton
                            className={styles.swapButton}
                            //imgSrc={swapIcon}
                            title={"Square"}
                            onClick={function(){}}
                        />
                    </div>
                    {/* It'd be nice to somehow make this a dragable order thing once markers are added */}
                    <div className={styles.rowHeader}> 
                        <span className={styles.labelName}>
                            <FormattedMessage
                                defaultMessage="Order"
                                description="Label for the order component in the style picker"
                                id="paint.paintEditor.order"
                            />
                        </span>
                        <LabeledIconButton
                            className={styles.swapButton}
                            //imgSrc={swapIcon}
                            title={"Outline, Fill"}
                            onClick={function(){}}
                        />
                        <LabeledIconButton
                            className={styles.swapButton}
                            //imgSrc={swapIcon}
                            title={"Fill, Outline"}
                            onClick={function(){}}
                        />
                    </div>
                    <div className={styles.rowHeader}> 
                        <span className={styles.labelName}>
                            <FormattedMessage
                                defaultMessage="Blending"
                                description="Label for the blending component in the style picker"
                                id="paint.paintEditor.blending"
                            />
                            <Dropdown
                                className={styles.modUnselect}
                                enterExitTransitionDurationMs={20}
                                popoverContent={
                                    <InputGroup
                                        className={styles.modContextMenu}
                                        rtl={this.props.rtl}
                                    >
                                        <Button
                                            className={styles.modMenuItem}
                                        >
                                            <span>
                                                Normal
                                            </span>
                                        </Button>
                                        <Button
                                            className={styles.modMenuItem}
                                        >
                                            <span>
                                                Add/Screen
                                            </span>
                                        </Button>
                                        <Button
                                            className={styles.modMenuItem}
                                        >
                                            <span>
                                                Multiply
                                            </span>
                                        </Button>
                                    </InputGroup>
                                }
                            >
                            </Dropdown>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

StrokeStylePickerComponent.propTypes = {
};

export default injectIntl(StrokeStylePickerComponent);
