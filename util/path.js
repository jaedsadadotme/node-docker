let version = '/v1.24'
module.exports = {
    containers:{
        list :{
            all: version+ '/containers/json?all=1',
            start: version+ '/containers/json?status=running',
        },
        inspect : (id) => {
            return version + `/containers/${id}/logs?follow=true&stderr=true&stdout=true&timestamps=true`
        }
    },
    images: {
        list :{
            all: version+ '/images/json?digests=1',
        },
        inspect : (id) => {
            return version + `/images/${id}/json`
        }
    }
}