/*
 * @Author: wusiyuan
 * @Date: 2022-09-05 10:30:00
 * @LastEditors: wusiyuan
 * @LastEditTime: 2022-09-05 10:31:07
 * @Description: Pub/Sub (仓库中获取事件)
 */
import { EventEmitter } from 'events'

const eventBus = new EventEmitter();

export default eventBus;