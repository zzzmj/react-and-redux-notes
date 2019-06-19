/**
 * 一个todo应该包含三个字段
 * {
 *     text: '内容',
 *     id: 1,
 *     completed: true
 * }
 */
import * as actionTypes from './actionTypes'

export const setFilterAll = () => {
    return {
        type: actionTypes.ALL,
    }
}

export const setFilterCompleted = () => {
    return {
        type: actionTypes.COMPLETED,
    }
}

export const setFilterUncompleted = () => {
    return {
        type: actionTypes.UNCOMPLETED,
    }
}

