Get started:

First, setup your SQL database in Azure. Then enter the relevant info inside the server.js config. Example config:
```const config = {
	user: 'myAdmin',
	password: 'myPassword',
	server: 'yourServer.database.windows.net',
	database: 'yourDbName',
	options: {
		encrypt: true, // for azure
		trustServerCertificate: true, // change to true for local dev / self-signed certs
	},
};```

Now to get started,
1. CD into the root directory
2. Run `npm install`
3. Run `node './server.js/`
4. Right-click and run index.html with live server
5. You are now connected to the database and working within it. You can view changes as you make them with SQL Server Management Studio.