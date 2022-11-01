/*
 * @Author: wusiyuan
 * @Date: 2022-07-04 14:03:14
 * @LastEditors: wusiyuan
 * @LastEditTime: 2022-10-31 21:17:05
 * @Description:
 */
import axios from 'axios';
import React, { useEffect, useState, useMemo, Fragment } from 'react';
import {
  Button,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Table,
  List,
  DatePicker,
  TreeSelect,
} from 'antd';
import reactCSS from 'reactcss';
import { SketchPicker, CompactPicker } from 'react-color';
import colorselect from '../../../../src/cbb/LngAndLatSelection/img/colorselect.png';
import setting from '../../../../src/cbb/LngAndLatSelection/img/setting.png';
import './index.css';

/**
 * @desc: 十六进制颜色转RGB数组
 * @param {*}
 * @author: wsy
 * @Date: 2022-10-26 10:19:36
 * @update:
 */
const set16ToRgb = (str: any) => {
  var reg = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;
  if (!reg.test(str)) {
    return;
  }
  let newStr = str.toLowerCase().replace(/\#/g, '');
  let len = newStr.length;
  if (len == 3) {
    let t = '';
    for (var i = 0; i < len; i++) {
      t += newStr.slice(i, i + 1).concat(newStr.slice(i, i + 1));
    }
    newStr = t;
  }
  let arr: any = []; //将字符串分隔，两个两个的分隔
  for (var i = 0; i < 6; i = i + 2) {
    let s = newStr.slice(i, i + 2);
    arr.push(parseInt('0x' + s));
  }
  return arr;
};

/**
 * @desc: RGB转16进制颜色
 * @param {*} str
 * @author: wsy
 * @Date: 2022-10-26 10:25:08
 * @update:
 */
const setRgbTo16 = (str: string) => {
  let reg = /^(rgb|RGB)/;
  if (!reg.test(str)) {
    return;
  }
  var arr = str.slice(4, str.length - 1).split(',');
  let color = '#';
  for (var i = 0; i < arr.length; i++) {
    var t = Number(arr[i]).toString(16);
    if (t == '0') {
      //如果为“0”的话，需要补0操作,否则只有5位数
      t = t + '0';
    }
    color += t;
  }
  return color;
};

const checkValue = (ipPart: any, bits: number) => {
  let type = `(^0$)|(^[1-9][0-9]{0,${bits}}$)`;
  let rule = new RegExp(type);
  return rule.test(ipPart);
};

export default function Exchange() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [color, setColor] = useState('');
  const [activeIndex, setActiveIndex] = useState(undefined);
  const [activeInputIndex, setActiveInputIndex] = useState(undefined);
  const [isArrow, setIsArrow] = useState(false);
  const [activeInputValue, setActiveInputValue] = useState(255);
  const [legendData, setLegendData] = useState([
    {
      R: '0',
      B: '0',
      G: '255',
      Value: '200',
    },
    {
      R: '192',
      B: '192',
      G: '255',
      Value: '400',
    },
    {
      R: '255',
      B: '0',
      G: '255',
      Value: '600',
    },
    {
      R: '255',
      B: '0',
      G: '128',
      Value: '1000',
    },
    {
      R: '255',
      B: '0',
      G: '0',
      Value: '2000',
    },
    {
      R: '128',
      B: '255',
      G: '128',
      Value: '4000',
    },
    {
      R: '85',
      B: '139',
      G: '26',
      Value: 'Max',
    },
  ]);
  const content = legendData.map((item: any, index: number) => {
    return (
      <div
        className='list-div'
        onMouseMove={() => {
          if (activeInputIndex !== undefined) return;
          setActiveIndex(index);
        }}
        onMouseLeave={() => {
          if (activeInputIndex !== undefined) return;
          setActiveIndex(undefined);
        }}
      >
        <div
          className='list-div-next'
          onMouseMove={() => setIsArrow(true)}
          onMouseLeave={() => setIsArrow(false)}
        >
          <div
            className='list-div-next-color'
            style={{
              backgroundColor: `rgb(${item.R},${item.G},${item.B})`,
            }}
          ></div>
          {['R', 'G', 'B'].map((colorItem, colorIndex) => {
            return (
              <div
                onClick={() => {
                  setActiveInputIndex(colorIndex);
                  setActiveInputValue(item[colorItem]);
                }}
              >
                {activeIndex === index && activeInputIndex === colorIndex ? (
                  <Input
                    // id='text-input'
                    autoFocus
                    value={activeInputValue}
                    onChange={(e: any) => setActiveInputValue(e.target.value)}
                    onBlur={(ele) => {
                      setActiveInputIndex(undefined);
                      let value = activeInputValue; //
                      if (checkValue(value, 2) && value >= 0 && value < 256)
                        item[colorItem] = value;
                      setLegendData([...legendData]);
                    }}
                  />
                ) : (
                  <div>{item[colorItem] + (colorItem !== 'B' ? '，' : '')}</div>
                )}
              </div>
            );
          })}
          {/* 拾色器 */}
          {activeIndex === index && isArrow ? (
            <div
              className='drop-color-picker'
              onClick={() => document.getElementById('#input')?.click()}
            >
              {<img src={colorselect} />}
              {/* <Input
                id='#input'
                type='color'
                value={setRgbTo16(`rgb(${item.R},${item.G},${item.B})`)}
                onChange={(e) =>
                  e.target.value
                    ? ((item['R'] = set16ToRgb(e.target.value)[0]),
                      (item['G'] = set16ToRgb(e.target.value)[1]),
                      (item['B'] = set16ToRgb(e.target.value)[2]))
                    : ''
                }
              /> */}
              <SketchPicker hidden id='#input' color={color} className='test' />
            </div>
          ) : (
            <div className='fit-width'></div>
          )}
        </div>
        <div className='list-div-end'>
          <div
            onClick={() => {
              setActiveInputIndex(3);
              setActiveInputValue(item.Value);
            }}
            className='list-div-end-edit'
          >
            {activeIndex === index && activeInputIndex === 3 ? (
              <Input
                id='text-input000'
                autoFocus
                value={activeInputValue}
                onChange={(e: any) => setActiveInputValue(e.target.value)}
                onBlur={(ele) => {
                  // setBlurFlag(null),
                  // parseInt(ele.target.value) < 400 &&
                  // parseInt(ele.target.value) >= 0
                  //   ? setPickValue0(ele.target.value)
                  //   : null
                  setActiveInputIndex(undefined);
                  // parseInt(ele.target.value) < 256 &&
                  // parseInt(ele.target.value) >= 0
                  //   ? setColorR0(ele.target.value)
                  //   : null;

                  let value = activeInputValue; //
                  if (Number(value) > 0 && checkValue(value, 5)) {
                    if (
                      index < 5 &&
                      Number(value) < legendData[index + 1].Value
                    ) {
                      item.Value = value;
                    }
                    if (index === 5) {
                      item.Value = value;
                    }
                  }
                  setLegendData([...legendData]);
                }}
              />
            ) : (
              <div>{item.Value}</div>
            )}
          </div>
        </div>
      </div>
    );
  });
  const handleOk = () => {
    setIsOpenModal(false);
  };
  const styles = useMemo(() => {
    return reactCSS({
      default: {
        color: {
          width: '36px',
          height: '14px',
          borderRadius: '2px',
          // background: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
          background: color,
        },
        swatch: {
          padding: '5px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
          top: -50,
          right: -261,
          paddingBottom: 60,
        },
        // cover: {
        //   position: 'fixed',
        //   top: '0px',
        //   right: '0px',
        //   bottom: '0px',
        //   left: '0px',
        // },
      },
    });
  }, [color]);

  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChange = (color) => {
    setColor(
      `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`
    );
  };
  return (
    <div id='CustomColors'>
      <div style={styles.swatch} onClick={handleClick}>
        <div style={styles.color} />
      </div>
      {displayColorPicker ? (
        <div style={styles.popover}>
          <div style={styles.cover} onClick={handleClose} />
          <SketchPicker color={color} onChange={handleChange} />
        </div>
      ) : null}
      {
        <div id='gis-legend'>
          {/* 第一行 */}
          <div className='self-legend'>
            <span>{`TVOC('μg/m³'} )`}</span>
            <span>
              <a>
                <img
                  src={setting}
                  onClick={() => {
                    setIsOpenModal(true);
                  }}
                />
              </a>
            </span>
          </div>
          {/* 下方色卡 */}
          <div id='gis-legend-bar'>
            <span>0</span>
            {legendData.map((item: any) => (
              <Fragment>
                <div></div>
                <div
                  style={{
                    backgroundColor: `rgb(${item.R},${item.G},${item.B})`,
                  }}
                  className='color-picker'
                >
                  <span className='picker-text'>{item.Value}</span>
                </div>
              </Fragment>
            ))}
          </div>
          <Modal
            visible={isOpenModal}
            title={'色卡设置'}
            maskClosable={false}
            onCancel={() => {
              setIsOpenModal(false);
            }}
            onOk={handleOk}
            bodyStyle={{ overflow: 'auto' }}
            className='modal-class self-modal'
          >
            <div id='picker-div'>
              {/* 第一行表头 */}
              <div className='row-first'>
                <div className='row-first-one'>{'颜色'}</div>
                <div className='row-first-two'>{'值'}</div>
              </div>
              {content}
            </div>
          </Modal>
        </div>
      }
    </div>
  );

  /* return (
    <div>
      <SketchPicker></SketchPicker>
    </div>
  ); */
}
