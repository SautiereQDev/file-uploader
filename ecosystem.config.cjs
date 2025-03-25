module.exports = {
	apps: [{
		name: 'files-uploader',
		script: 'src/server.ts',
		env: {
			NODE_ENV: 'production'
		}
	}]
};