const Spaceschema = require('spaceschema')
const SpacedbBuilder = require('p2p-spacedb/builder')
const Spacedispatch = require('spacedispatch')

// SCHEMA CREATION START //
const autopass = Spaceschema.from('./spec/schema')
const template = autopass.namespace('autopass')
// You can find a list of supported data types here: https://github.com/holepunchto/compact-encoding
template.register({
  name: 'records',
  compact: false,
  fields: [{
    name: 'key',
    type: 'string',
    required: true
  }, {
    name: 'value',
    type: 'string',
    required: false
  }
  ]
})

template.register({
  name: 'writer',
  compact: false,
  fields: [{
    name: 'key',
    type: 'buffer',
    required: true
  }
  ]
})

template.register({
  name: 'delete',
  compact: false,
  fields: [{
    name: 'key',
    type: 'string',
    required: true
  }
  ]
})

template.register({
  name: 'invite',
  compact: false,
  fields: [{
    name: 'id',
    type: 'buffer',
    required: true
  }, {
    name: 'invite',
    type: 'buffer',
    required: true
  }, {
    name: 'publicKey',
    type: 'buffer',
    required: true
  }, {
    name: 'expires',
    type: 'int',
    required: true
  }
  ]
})
Spaceschema.toDisk(autopass)

const dbTemplate = SpacedbBuilder.from('./spec/schema', './spec/db')
const blobs = dbTemplate.namespace('autopass')
blobs.collections.register({
  name: 'records',
  schema: '@autopass/records',
  key: ['key']
})
blobs.collections.register({
  name: 'invite',
  schema: '@autopass/invite',
  key: ['id']
})
blobs.collections.register({
  name: 'writer',
  schema: '@autopass/writer',
  key: ['key']
})

blobs.collections.register({
  name: 'delete',
  schema: '@autopass/delete',
  key: ['key']
})

SpacedbBuilder.toDisk(dbTemplate)

const spacedispatch = Spacedispatch.from('./spec/schema', './spec/spacedispatch')
const namespace = spacedispatch.namespace('autopass')
namespace.register({
  name: 'remove-writer',
  requestType: '@autopass/writer'
})
namespace.register({
  name: 'add-writer',
  requestType: '@autopass/writer'
})
namespace.register({
  name: 'put',
  requestType: '@autopass/records'
})
namespace.register({
  name: 'del',
  requestType: '@autopass/delete'
})
namespace.register(({
  name: 'add-invite',
  requestType: '@autopass/invite'
}))
Spacedispatch.toDisk(spacedispatch)
