// This file is autogenerated by the spaceschema compiler
// Schema Version: 1
/* eslint-disable camelcase */
/* eslint-disable quotes */

const VERSION = 1
const { c } = require('spaceschema/runtime')

// eslint-disable-next-line no-unused-vars
let version = VERSION

// @autopass/records
const encoding0 = {
  preencode (state, m) {
    c.string.preencode(state, m.key)
    state.end++ // max flag is 1 so always one byte

    if (m.value) c.string.preencode(state, m.value)
  },
  encode (state, m) {
    const flags = m.value ? 1 : 0

    c.string.encode(state, m.key)
    c.uint.encode(state, flags)

    if (m.value) c.string.encode(state, m.value)
  },
  decode (state) {
    const r0 = c.string.decode(state)
    const flags = c.uint.decode(state)

    return {
      key: r0,
      value: (flags & 1) !== 0 ? c.string.decode(state) : null
    }
  }
}

// @autopass/writer
const encoding1 = {
  preencode (state, m) {
    c.buffer.preencode(state, m.key)
  },
  encode (state, m) {
    c.buffer.encode(state, m.key)
  },
  decode (state) {
    const r0 = c.buffer.decode(state)

    return {
      key: r0
    }
  }
}

// @autopass/delete
const encoding2 = {
  preencode (state, m) {
    c.string.preencode(state, m.key)
  },
  encode (state, m) {
    c.string.encode(state, m.key)
  },
  decode (state) {
    const r0 = c.string.decode(state)

    return {
      key: r0
    }
  }
}

// @autopass/invite
const encoding3 = {
  preencode (state, m) {
    c.buffer.preencode(state, m.id)
    c.buffer.preencode(state, m.invite)
    c.buffer.preencode(state, m.publicKey)
    c.int.preencode(state, m.expires)
  },
  encode (state, m) {
    c.buffer.encode(state, m.id)
    c.buffer.encode(state, m.invite)
    c.buffer.encode(state, m.publicKey)
    c.int.encode(state, m.expires)
  },
  decode (state) {
    const r0 = c.buffer.decode(state)
    const r1 = c.buffer.decode(state)
    const r2 = c.buffer.decode(state)
    const r3 = c.int.decode(state)

    return {
      id: r0,
      invite: r1,
      publicKey: r2,
      expires: r3
    }
  }
}

// @autopass/records/spacedb#0
const encoding4 = {
  preencode (state, m) {
    state.end++ // max flag is 1 so always one byte

    if (m.value) c.string.preencode(state, m.value)
  },
  encode (state, m) {
    const flags = m.value ? 1 : 0

    c.uint.encode(state, flags)

    if (m.value) c.string.encode(state, m.value)
  },
  decode (state) {
    const flags = c.uint.decode(state)

    return {
      key: null,
      value: (flags & 1) !== 0 ? c.string.decode(state) : null
    }
  }
}

// @autopass/invite/spacedb#1
const encoding5 = {
  preencode (state, m) {
    c.buffer.preencode(state, m.invite)
    c.buffer.preencode(state, m.publicKey)
    c.int.preencode(state, m.expires)
  },
  encode (state, m) {
    c.buffer.encode(state, m.invite)
    c.buffer.encode(state, m.publicKey)
    c.int.encode(state, m.expires)
  },
  decode (state) {
    const r1 = c.buffer.decode(state)
    const r2 = c.buffer.decode(state)
    const r3 = c.int.decode(state)

    return {
      id: null,
      invite: r1,
      publicKey: r2,
      expires: r3
    }
  }
}

// @autopass/writer/spacedb#2
const encoding6 = {
  preencode (state, m) {

  },
  encode (state, m) {

  },
  decode (state) {
    return {
      key: null
    }
  }
}

// @autopass/delete/spacedb#3
const encoding7 = encoding6

function setVersion (v) {
  version = v
}

function encode (name, value, v = VERSION) {
  version = v
  return c.encode(getEncoding(name), value)
}

function decode (name, buffer, v = VERSION) {
  version = v
  return c.decode(getEncoding(name), buffer)
}

function getEnum (name) {
  switch (name) {
    default: throw new Error('Enum not found ' + name)
  }
}

function getEncoding (name) {
  switch (name) {
    case '@autopass/records': return encoding0
    case '@autopass/writer': return encoding1
    case '@autopass/delete': return encoding2
    case '@autopass/invite': return encoding3
    case '@autopass/records/spacedb#0': return encoding4
    case '@autopass/invite/spacedb#1': return encoding5
    case '@autopass/writer/spacedb#2': return encoding6
    case '@autopass/delete/spacedb#3': return encoding7
    default: throw new Error('Encoder not found ' + name)
  }
}

function getStruct (name, v = VERSION) {
  const enc = getEncoding(name)
  return {
    preencode (state, m) {
      version = v
      enc.preencode(state, m)
    },
    encode (state, m) {
      version = v
      enc.encode(state, m)
    },
    decode (state) {
      version = v
      return enc.decode(state)
    }
  }
}

const resolveStruct = getStruct // compat

module.exports = { resolveStruct, getStruct, getEnum, getEncoding, encode, decode, setVersion, version }
