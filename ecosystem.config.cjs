module.exports = {
	apps: [{
		name: 'image-uploader',
		script: 'src/server.ts',
		env: {
			NODE_ENV: 'production'
		}
	}]
};