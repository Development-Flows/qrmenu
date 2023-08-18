"use client";
import React, {
  CSSProperties,
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "./index.module.scss";

type AnimationNames = "slideRight" | "slideLeft" | "slideBottom" | "slideTop";

type EnteringAnimationsType = {
  [key in AnimationNames]: {
    from: CSSProperties;
    to: CSSProperties;
    root?: CSSProperties;
  };
};

const enteringAnimations: EnteringAnimationsType = {
  slideRight: {
    from: { transform: "translateX(100%)" },
    to: { transform: "translateX(0%)" },
  },
  slideLeft: {
    from: { transform: "translateX(-100%)" },
    to: { transform: "translateX(0%)" },
  },
  slideBottom: {
    from: { transform: "translateY(100%)" },
    to: { transform: "translateY(0%)" },
    root: {
      /*justifyContent: "flex-end"*/
    },
  },
  slideTop: {
    from: { transform: "translateY(-100%)" },
    to: { transform: "translateY(0%)" },
  },
};

const exitingAnimations: EnteringAnimationsType = {
  slideRight: {
    from: { transform: "translateX(0%)" },
    to: { transform: "translateX(100%)" },
  },
  slideLeft: {
    from: { transform: "translateX(0%)" },
    to: { transform: "translateX(-100%)" },
  },
  slideBottom: {
    from: { transform: "translateY(0%)" },
    to: { transform: "translateY(100%)" },
    root: {
      /*justifyContent: "flex-end"*/
    },
  },
  slideTop: {
    from: { transform: "translateY(0%)" },
    to: { transform: "translateY(-100%)" },
  },
};

type RootStyleType = { [key in AnimationNames]: CSSProperties };
const rootStyle: RootStyleType = {
  slideRight: {},
  slideLeft: {},
  slideBottom: { justifyContent: "flex-end" },
  slideTop: {},
};

const enteringAnim = (
  timing: number,
  type: string,
  key: AnimationNames,
  direction: "from" | "to",
  extraStyles?: CSSProperties
): CSSProperties => {
  return {
    ...extraStyles,
    transition: `all ${timing}ms ${type} 0s`,
    ...enteringAnimations[key][direction],
  };
};

const exitingAnim = (
  timing: number,
  type: string,
  key: AnimationNames,
  direction: "from" | "to",
  extraStyles?: CSSProperties
): CSSProperties => {
  return {
    ...extraStyles,
    transition: `all ${timing}ms ${type} 0s`,
    ...exitingAnimations[key][direction],
  };
};

interface ModalProps {
  isVisible: boolean;
  children: ReactNode;
  noBackdrop?: boolean;
  backdropStyle?: Omit<
    CSSProperties,
    "opacity" | "transition" | "transitionTimingFunction"
  >;
  backdropOpacity?: CSSProperties["opacity"];
  animationInTiming?: number;
  animationOutTiming?: number;
  zIndex?: number;
  onBackDropClick?: () => void;
  onBackButtonClick?: () => void;
  enteringAnimation?: AnimationNames;
  enteringAnimationType?: CSSProperties["transitionTimingFunction"];
  exitingAnimation?: AnimationNames;
  exitingAnimationType?: CSSProperties["transitionTimingFunction"];
  style?: CSSProperties;
  containerStyle?: CSSProperties;
}

const Modal: FC<ModalProps> = ({
  children,
  noBackdrop,
  backdropStyle,
  backdropOpacity = 0.5,
  animationInTiming = 300,
  animationOutTiming = 300,
  zIndex = 100,
  enteringAnimation = "slideBottom",
  enteringAnimationType = "ease",
  exitingAnimation = "slideBottom",
  exitingAnimationType = "ease",
  isVisible,
  onBackDropClick,
  onBackButtonClick,
  style,
  containerStyle,
}) => {
  const uniqueModalId = useMemo(() => {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }, []);

  const [_isVisible, _setIsVisible] = useState(isVisible);

  const [_backdropStyle, _setBackdropStyle] = useState<CSSProperties>({
    opacity: 0,
    transition: `opacity ${animationInTiming}ms ease 0s`,
  });
  const popStateEventListenerAdded = useRef<boolean>(false);

  const [modalStyle, setModalStyle] = useState<CSSProperties>({});

  const handlePopState = useCallback(
    (event: PopStateEvent) => {
      history.pushState({ uniqueModalId }, document.title, location.href);
      if (onBackButtonClick) onBackButtonClick();
    },
    [onBackButtonClick, uniqueModalId]
  );

  useEffect(() => {
    if (!isVisible && onBackButtonClick) {
      window.removeEventListener("popstate", handlePopState);
    }
  }, [handlePopState, isVisible, onBackButtonClick]);

  const animationRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (isVisible) {
      clearTimeout(animationRef.current);
      _setIsVisible(true);
      _setBackdropStyle({ opacity: 0 });
      setModalStyle(
        enteringAnim(
          animationInTiming,
          enteringAnimationType,
          enteringAnimation,
          "from",
          containerStyle
        )
      );
      animationRef.current = setTimeout(() => {
        _setBackdropStyle({
          opacity: backdropOpacity,
          transition: `opacity ${animationInTiming}ms ${enteringAnimationType} 0s`,
        });
        setModalStyle(
          enteringAnim(
            animationInTiming,
            enteringAnimationType,
            enteringAnimation,
            "to",
            containerStyle
          )
        );
      }, 10);
    } else {
      clearTimeout(animationRef.current);
      _setBackdropStyle({
        opacity: 0,
        transition: `opacity ${animationOutTiming}ms ${exitingAnimationType} 0s`,
      });
      setModalStyle(
        exitingAnim(
          animationInTiming,
          exitingAnimationType,
          exitingAnimation,
          "to",
          containerStyle
        )
      );
      animationRef.current = setTimeout(() => {
        _setIsVisible(false);
        if (onBackButtonClick) {
          window.removeEventListener("popstate", handlePopState);
        }
      }, animationOutTiming);
    }
  }, [
    isVisible,
    backdropOpacity,
    animationInTiming,
    animationOutTiming,
    enteringAnimationType,
    enteringAnimation,
    exitingAnimationType,
    exitingAnimation,
    containerStyle,
    onBackButtonClick,
    handlePopState,
  ]);

  useEffect(() => {
    if (onBackButtonClick) {
      if (popStateEventListenerAdded.current === false && isVisible) {
        history.pushState({ uniqueModalId }, document.title, location.href);
        window.addEventListener("popstate", handlePopState);
        popStateEventListenerAdded.current = true;
      }
    }
    return () => {
      window.removeEventListener("popstate", handlePopState);
      if (popStateEventListenerAdded.current === true) {
        if (history.state.uniqueModalId === uniqueModalId) {
          history.back();
        } else {
          while (history.state.uniqueModalId !== uniqueModalId) {
            history.back();
          }
        }
        popStateEventListenerAdded.current = false;
      }
    };
  }, [handlePopState, onBackButtonClick, uniqueModalId, isVisible]);

  const mergedBackdropStyle = {
    ..._backdropStyle,
    ...backdropStyle,
  };

  if (!_isVisible) return null;

  return (
    <div
      className={styles.root}
      style={{ zIndex, ...style, ...rootStyle[enteringAnimation] }}
    >
      {!noBackdrop && (
        <button
          className={styles.backdrop}
          style={mergedBackdropStyle}
          onClick={onBackDropClick}
        />
      )}
      <div className={styles.modal} style={modalStyle}>
        {children}
      </div>
    </div>
  );
};
export default Modal;
