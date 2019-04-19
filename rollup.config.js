// rollup.config.js
import resolve from 'rollup-plugin-node-resolve';

export default {
    input: 'src/interface.bs.js',
    output: {
        file: 'bundle.js',
        format: 'iife',
        name: 'Bouncer',
    },
    plugins: [
        resolve()
    ]
};