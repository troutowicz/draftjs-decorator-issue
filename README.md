`yarn`
`yarn start`

Type `$` to trigger the decorator. The decorator component's value includes it's entity key. As long as the cursor is at the end of the block, the decorator works fine. If the cursor is placed anywhere behind an existing entity, the decorator gets weird. New decorator components are passed the wrong entity key initially, updating to the correct entity key after mount.
