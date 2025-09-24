import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import {FormattedMessage} from 'react-intl';

import Button from '../button/button.jsx';
import Dropdown from '../dropdown/dropdown.jsx';
import InputGroup from '../input-group/input-group.jsx';
import Fonts from '../../lib/fonts';
import CustomFontButton from './custom-font-button.jsx';
import styles from './font-dropdown.css';

const DisplayFont = ({font, getFontName}) => (
    <span
        style={{
            fontFamily: font
        }}
    >
        {getFontName(font)}
    </span>
);
DisplayFont.propTypes = {
    font: PropTypes.string.isRequired,
    getFontName: PropTypes.func.isRequired
};

const ModeToolsComponent = props => (
    <Dropdown
        className={classNames(styles.modUnselect, styles.fontDropdown)}
        enterExitTransitionDurationMs={60}
        popoverContent={
            <InputGroup className={styles.fontContextMenu}>
                <Button
                    className={classNames(styles.modMenuItem)}
                    onClick={props.onChoose}
                    onMouseOver={props.onHoverSansSerif}
                >
                    <DisplayFont
                        font={Fonts.SANS_SERIF}
                        getFontName={props.getFontName}
                    />
                </Button>
                <Button
                    className={classNames(styles.modMenuItem)}
                    onClick={props.onChoose}
                    onMouseOver={props.onHoverSerif}
                >
                    <DisplayFont
                        font={Fonts.SERIF}
                        getFontName={props.getFontName}
                    />
                </Button>
                <Button
                    className={classNames(styles.modMenuItem)}
                    onClick={props.onChoose}
                    onMouseOver={props.onHoverHandwriting}
                >
                    <DisplayFont
                        font={Fonts.HANDWRITING}
                        getFontName={props.getFontName}
                    />
                </Button>
                <Button
                    className={classNames(styles.modMenuItem)}
                    onClick={props.onChoose}
                    onMouseOver={props.onHoverMarker}
                >
                    <DisplayFont
                        font={Fonts.MARKER}
                        getFontName={props.getFontName}
                    />
                </Button>
                <Button
                    className={classNames(styles.modMenuItem)}
                    onClick={props.onChoose}
                    onMouseOver={props.onHoverCurly}
                >
                    <DisplayFont
                        font={Fonts.CURLY}
                        getFontName={props.getFontName}
                    />
                </Button>
                <Button
                    className={classNames(styles.modMenuItem)}
                    onClick={props.onChoose}
                    onMouseOver={props.onHoverPixel}
                >
                    <DisplayFont
                        font={Fonts.PIXEL}
                        getFontName={props.getFontName}
                    />
                </Button>
                <Button
                    className={classNames(styles.modMenuItem)}
                    onClick={props.onChoose}
                    onMouseOver={props.onHoverPlayful}
                >
                    <DisplayFont
                        font={Fonts.PLAYFUL}
                        getFontName={props.getFontName}
                    />
                </Button>
                <Button
                    className={classNames(styles.modMenuItem)}
                    onClick={props.onChoose}
                    onMouseOver={props.onHoverBubbly}
                >
                    <DisplayFont
                        font={Fonts.BUBBLY}
                        getFontName={props.getFontName}
                    />
                </Button>
                <Button
                    className={classNames(styles.modMenuItem)}
                    onClick={props.onChoose}
                    onMouseOver={props.onHoverArcade}
                >
                    <DisplayFont
                        font={Fonts.ARCADE}
                        getFontName={props.getFontName}
                    />
                </Button>
                <Button
                    className={classNames(styles.modMenuItem)}
                    onClick={props.onChoose}
                    onMouseOver={props.onHoverBitsAndBytes}
                >
                    <DisplayFont
                        font={Fonts.BITSANDBYTES}
                        getFontName={props.getFontName}
                    />
                </Button>
                <Button
                    className={classNames(styles.modMenuItem)}
                    onClick={props.onChoose}
                    onMouseOver={props.onHoverTechnological}
                >
                    <DisplayFont
                        font={Fonts.TECHNOLOGICAL}
                        getFontName={props.getFontName}
                    />
                </Button>
                <Button
                    className={classNames(styles.modMenuItem)}
                    onClick={props.onChoose}
                    onMouseOver={props.onHoverScratch}
                >
                    <DisplayFont
                        font={Fonts.SCRATCH}
                        getFontName={props.getFontName}
                    />
                </Button>
                <Button
                    className={classNames(styles.modMenuItem)}
                    onClick={props.onChoose}
                    onMouseOver={props.onHoverArchivo}
                >
                    <DisplayFont
                        font={Fonts.ARCHIVO}
                        getFontName={props.getFontName}
                    />
                </Button>
                <Button
                    className={classNames(styles.modMenuItem)}
                    onClick={props.onChoose}
                    onMouseOver={props.onHoverArchivoBlack}
                >
                    <DisplayFont
                        font={Fonts.ARCHIVOBLACK}
                        getFontName={props.getFontName}
                    />
                </Button>
                <Button
                    className={classNames(styles.modMenuItem)}
                    onClick={props.onChoose}
                    onMouseOver={props.onHoverChinese}
                >
                    <DisplayFont
                        font={Fonts.CHINESE}
                        getFontName={props.getFontName}
                    />
                </Button>
                <Button
                    className={classNames(styles.modMenuItem)}
                    onClick={props.onChoose}
                    onMouseOver={props.onHoverJapanese}
                >
                    <DisplayFont
                        font={Fonts.JAPANESE}
                        getFontName={props.getFontName}
                    />
                </Button>
                <Button
                    className={classNames(styles.modMenuItem)}
                    onClick={props.onChoose}
                    onMouseOver={props.onHoverKorean}
                >
                    <DisplayFont
                        font={Fonts.KOREAN}
                        getFontName={props.getFontName}
                    />
                </Button>
                {props.customFonts.map(font => (
                    <CustomFontButton
                        key={font.name}
                        font={font.family}
                        className={classNames(styles.modMenuItem)}
                        onClick={props.onChoose}
                        onMouseOver={props.onHoverCustom}
                    >
                        <DisplayFont
                            font={font.family}
                            getFontName={props.getFontName}
                        />
                    </CustomFontButton>
                ))}
                {props.onManageFonts && ( // Doesnt show since the managefonts function doesnt exist. I'll have to do some things myself...
                    <Button
                        className={styles.modMenuItem}
                        onClick={props.onManageFonts}
                    >
                        <FormattedMessage
                            defaultMessage="Add more fonts..."
                            description="Button in vector editor font list to add more fonts"
                            id="tw.paint.fonts.more"
                        />
                    </Button>
                )}
            </InputGroup>
        }
        ref={props.componentRef}
        tipSize={.01}
        onOpen={props.onOpenDropdown}
        onOuterAction={props.onClickOutsideDropdown}
    >
        <span
            className={styles.displayedFontName}
            style={props.font === "Bits and Bytes" ? { transform: "scale(0.5)", transformOrigin: "left" } : {}}
        >
            <DisplayFont
                font={props.font}
                getFontName={props.getFontName}
            />
        </span>
    </Dropdown>
);

ModeToolsComponent.propTypes = {
    componentRef: PropTypes.func.isRequired,
    customExists: PropTypes.bool,
    customClass: PropTypes.string,
    customName: PropTypes.string,
    font: PropTypes.string,
    getFontName: PropTypes.func.isRequired,
    onChoose: PropTypes.func.isRequired,
    onChooseCustom: PropTypes.func,
    onChooseExisting: PropTypes.func,
    onClickOutsideDropdown: PropTypes.func,
    customFonts: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        family: PropTypes.string.isRequired
    })).isRequired,
    onHoverCustom: PropTypes.func.isRequired,
    onManageFonts: PropTypes.func,
    onHoverChinese: PropTypes.func,
    onHoverCurly: PropTypes.func,
    onHoverHandwriting: PropTypes.func,
    onHoverJapanese: PropTypes.func,
    onHoverKorean: PropTypes.func,
    onHoverMarker: PropTypes.func,
    onHoverPixel: PropTypes.func,
    onHoverPlayful: PropTypes.func,
    onHoverBubbly: PropTypes.func,
    onHoverBitsAndBytes: PropTypes.func,
    onHoverTechnological: PropTypes.func,
    onHoverArcade: PropTypes.func,
    onHoverScratch: PropTypes.func,
    onHoverArchivo: PropTypes.func,
    onHoverArchivoBlack: PropTypes.func,
    onHoverSansSerif: PropTypes.func,
    onHoverSerif: PropTypes.func,
    onOpenDropdown: PropTypes.func
};
export default ModeToolsComponent;
