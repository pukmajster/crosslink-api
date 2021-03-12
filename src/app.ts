import express from 'express';
import notifier from 'node-notifier';
import open from 'open'
import cors from 'cors'
import fs from 'fs'
import https from 'https'

const app = express();
const port = 3000;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Here we recieve the request to open a link on the PC.
// The user must press the actuall notification to open the url in the default browser
// in a new tab
app.get('/open-link-on-pc', (req, res) => {

    // Make sure we have all the query params we need
    const { title, url } = req.query;
    if(!title || !url) {
        return res.status(400).send('Invalid parameters');
    }

    // Ask the user if they want to open the link
    notifier.notify({
        title: 'Open link?',
        subtitle: title,
        message: title,
        sound: false,
        wait: false
    },
    async function (err, response, metadata) {

        // If the user clicked on the notifiaction, open the url
        if(metadata.action == 'clicked') {
            try {
                await open(url as string);
            }
            catch (e) {

                // Big oof... something went wrong
                console.log('Failed to open url', e);
                return res.status(500).send('Successfully recieved request to open an url.');
            }
        }
    });

    // Yay we did it
    return res.status(202).send('Successfully recieved request to open an url.');
});

app.use(function (req, res) {
    res.status(404).render('You might be lost...');
});

app.listen(port, () => {

    // notifier.notify({
    //     title: 'crosslink-api live!',
    //     message: `crosslink-api is listening on ${port}`,
    //     sound: false,
    //     wait: false
    // });

    console.log(`server is listening on ${port}`);
});
