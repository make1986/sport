import React from "react";

import config from "../../../../../../../server/etc/config";

export default class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0
    };
    this.dotClick = this.dotClick.bind(this);
    this.sliderPrev = this.sliderPrev.bind(this);
    this.sliderNext = this.sliderNext.bind(this);
  }
  sliderNext() {
    const { length } = this.props.data;
    let { active } = this.state;
    if (active < length - 1) {
      this.setState({ active: active + 1 }, function() {
        this.nextImg();
      });
    } else {
      this.setState({ active: 0 }, function() {
        this.nextImg();
      });
    }
  }
  sliderPrev() {
    const { length } = this.props.data;
    let { active } = this.state;
    if (active > 0) {
      this.setState({ active: active - 1 }, function() {
        this.nextImg();
      });
    } else {
      this.setState({ active: length - 1 }, function() {
        this.nextImg();
      });
    }
  }
  nextImg() {
    let { active } = this.state;
    let { images } = this;
    let parentWidth = images.parentElement.clientWidth;
    images.style.transform = `translateX(-${active * parentWidth}px)`;
  }
  dotClick(idx) {
    this.setState({ active: idx }, function() {
      this.nextImg();
    });
  }
  render() {
    const { data } = this.props;
    const { active } = this.state;
    return (
      <div className="gallery">
        <div
          ref={i => (this.images = i)}
          className="images"
          style={{ width: `${100 * data.length}%` }}
        >
          {data.map((img, idx) => (
            <div
              style={{
                background: `url(${config.API_PREFIX}/Uploads/Images/${img})`
              }}
              className="images__img"
              key={idx}
            />
          ))}
        </div>
        <div className="dots">
          {data.map((img, idx) => (
            <span
              onClick={() => this.dotClick(idx)}
              className={active === idx ? "dot active" : "dot"}
              key={idx}
            />
          ))}
        </div>
        <div className="slider">
          <div onClick={this.sliderPrev} className="left" />
          <div onClick={this.sliderNext} className="right" />
        </div>
      </div>
    );
  }
}
