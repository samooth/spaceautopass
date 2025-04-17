# autopass

Distributed notes/password manager

``` sh
npm install spaceautopass
```

## Usage

First choose if you wanna pair or make a new instance.

``` js
import Autopass from 'spaceautopass'
import Corestore from 'spacecorestore'

const pass = new Autopass(new Corestore('./pass'))

const inv = await pass.createInvite()
console.log('share to add', inv)
```

Then invite another instance

``` js
const pair = Autopass.pair(new Corestore('./another-pass'), inv)

const anotherPass = await pair.finished()
await anotherPass.ready()
```

When paired you can simply start the instance again with the normal constructor.

``` js
await pass.add('a-note', 'hello this is a note')
```

Then on the other node you get it out with

``` js
const note = await pass.get('a-note')
console.log({ note })
```

## API

#### `pass = new Autopass(new Corestore(path))`

Make a new pass instance.

#### `pass.on('update', fn)`

Triggered when it updates, ie something added/removed an entry

#### `value = await pass.get(key)`

Get an entry.

#### `stream = pass.list()`

Get all entries.

#### `await pass.add(key, value)`

Add new entry

#### `await pass.remove(key)`

Remove an entry.

#### `await pass.removeWriter(writerKey)`

Remove a writer explictly.

#### `await pass.addWriter(writerKey)`

Add a writer explictly.

#### `pass.writerKey`

Get the local writer key.

#### `inv = await pass.createInvite()`

Get invite to add a writer.

#### `await pass.ready()`

Wait for the pass to load fully

#### `pair = Autopass.pair(new Corestore(path), invite)`

Pair with another instance.

#### `pass = await pair.finished()`

Wait for the pair to finish.

#### `await pair.close()`

Force close the pair instance. Only need to call this if you dont wait for it to finish.get

#### `await pass.close()`

Fully close the pass instance.

## Contributors

Written with big contributions from [@supersu](https://github.com/supersuryaansh)
