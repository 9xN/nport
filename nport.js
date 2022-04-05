const net = require('net')
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})



const dotsPattern = [
    "⠋",
    "⠙",
    "⠹",
    "⠸",
    "⠼",
    "⠴",
    "⠦",
    "⠧",
    "⠇",
    "⠏"
]


const colours = {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    dim: "\x1b[2m",
    underscore: "\x1b[4m",
    blink: "\x1b[5m",
    reverse: "\x1b[7m",
    hidden: "\x1b[8m",

    fg: {
        black: "\x1b[30m",
        red: "\x1b[31m",
        green: "\x1b[32m",
        yellow: "\x1b[33m",
        blue: "\x1b[34m",
        magenta: "\x1b[35m",
        cyan: "\x1b[36m",
        white: "\x1b[37m",
        crimson: "\x1b[38m" // Scarlet
    },
    bg: {
        black: "\x1b[40m",
        red: "\x1b[41m",
        green: "\x1b[42m",
        yellow: "\x1b[43m",
        blue: "\x1b[44m",
        magenta: "\x1b[45m",
        cyan: "\x1b[46m",
        white: "\x1b[47m",
        crimson: "\x1b[48m"
    }
};

const spinnerFrames = dotsPattern
const spinnerTimeInterval = 80
let index = 0
var i = 0;
console.log(i);


function startupScreen() {
    totalTime = setInterval(() => {
        let now = spinnerFrames[index]
        if (now == undefined) {
            index = 0
            now = spinnerFrames[index]
        }
        console.clear();
        console.log(colours.fg.magenta, "                     ╔╗   ", colours.reset)
        console.log(colours.fg.magenta, "                    ╔╝╚╗  ", colours.reset)
        console.log(colours.fg.magenta, "     ╔══╗╔══╗╔══╗╔═╗╚╗╔╝  ", colours.reset)
        console.log(colours.fg.magenta, "     ║╔╗║║╔╗║║╔╗║║╔╝ ║║   ", colours.reset)
        console.log(colours.fg.magenta, "     ║║║║║╚╝║║╚╝║║║  ║╚╗  ", colours.reset)
        console.log(colours.fg.magenta, "     ╚╝╚╝║╔═╝╚══╝╚╝  ╚═╝  ", colours.reset)
        console.log(colours.fg.magenta, "         ║║               ", colours.reset)
        console.log(colours.fg.magenta, "         ╚╝               ", colours.reset)
        console.log("     ", now, colours.blink, colours.fg.crimson, "Loading...", colours.reset, now, "\n")
        index = index >= spinnerFrames.length ? 0 : index + 1

    }, spinnerTimeInterval)
}







function questions() {
    console.clear();
    console.log(colours.fg.magenta, "                     ╔╗   ", colours.reset)
    console.log(colours.fg.magenta, "                    ╔╝╚╗  ", colours.reset)
    console.log(colours.fg.magenta, "     ╔══╗╔══╗╔══╗╔═╗╚╗╔╝  ", colours.reset)
    console.log(colours.fg.magenta, "     ║╔╗║║╔╗║║╔╗║║╔╝ ║║   ", colours.reset)
    console.log(colours.fg.magenta, "     ║║║║║╚╝║║╚╝║║║  ║╚╗  ", colours.reset)
    console.log(colours.fg.magenta, "     ╚╝╚╝║╔═╝╚══╝╚╝  ╚═╝  ", colours.reset)
    console.log(colours.fg.magenta, "         ║║               ", colours.reset)
    console.log(colours.fg.magenta, "         ╚╝               ", colours.reset, colours.fg.crimson)
    readline.question(`Enter target address: `, subjectAddress => {
        readline.question(`Enter concurrent scan limit: `, concurrentScanLimit => {
            readline.question(`Enter sock timeout: `, sockTimeout => {
                const stopWatch = setInterval(function() {
                    i++;
                }, 10);
                var verifyConcurrent = Number(concurrentScanLimit)
                var verifyTimeout = Number(sockTimeout)
                    // Argument Validation
                if (typeof subjectAddress !== 'string') {
                    return console.error('\n\nThe \"address\" argument cannot be found. Add a process argument \"{ip|host}\"')
                }
                if (typeof verifyConcurrent !== 'number' || verifyConcurrent <= 0) {
                    return console.error('\n\nThe \"concurrency\" argument is invalid. Set it with a valid integer value that is greater than 0. Example, \"{1000}\"')
                }
                if (typeof verifyTimeout !== 'number' || verifyTimeout <= 0) {
                    return console.error('\n\nThe \"timeout\" argument is invalid. Set it with a valid integer value that is greater than 0. It is measured in milliseconds. Argument example \"{700}\"')
                }


                // Stores state for all of the worker statuses.
                let workerStatuses = {}
                let openPorts = []
                let closedPorts = []
                let activeWorkerCount = 0



                // function is run whenever a concurrencyWorker has started its duty
                function concurrencyStartEvent(workerStatus) {
                    activeWorkerCount++
                }

                // function is run whenever a concurrencyWorker has completed its duty
                function concurrencyEndEvent(workerStatus) {
                    activeWorkerCount--
                    if (activeWorkerCount === 0) {
                        // all concurrency workers have finished their execution
                        clearInterval(stopWatch)
                        
                        console.clear();
                        console.log('                        ._________________.')
                        console.log('                        |.---------------.|')
                        console.log('                        ||               ||')
                        console.log('                        ||', colours.fg.green, colours.blink, "  SCAN", colours.reset, '    ||')
                        console.log('                        ||', colours.fg.green, colours.blink, "COMPLETE", colours.reset, '  ||')
                        console.log('                        ||               ||')
                        console.log('                        ||               ||')
                        console.log('                        ||_______________||')
                        console.log('                        /.-.-.-.-.-.-.-.-.\\')
                        console.log('                       /.-.-.-.-.-.-.-.-.-.\\')
                        console.log('                      /.-.-.-.-.-.-.-.-.-.-.\\')
                        console.log('                     /______/__________\\___o_\\ ')
                        console.log('                     \\_______________________/    ')
                    
                        if (openPorts.length > 0) {

                            console.log(`        ╔════════════════════════╦════════════════════════╗
                 Target address: ║ ${subjectAddress}       
        ╠════════════════════════╬════════════════════════╣
             Open|Closed port #: ║ ${openPorts.length}|${closedPorts.length}
        ╠════════════════════════╬════════════════════════╣
                 Open port list: ║ ${openPorts.join('|')}  
        ╠════════════════════════╬════════════════════════╣
           Time to preform scan: ║ ${i/100} seconds          
        ╚════════════════════════╩════════════════════════╝`)
                                // console.log(`Open ports: ${openPorts.join(', ')}`)
                                // console.log(`total time: ${i/100} seconds`)
                        } else {
                            console.log(`        ╔════════════════════════╦════════════════════════╗
                 Target address: ║ ${subjectAddress}       
        ╠════════════════════════╬════════════════════════╣
             Open|Closed port #: ║ ${openPorts.length}|${closedPorts.length}
        ╠════════════════════════╬════════════════════════╣
           Time to preform scan: ║ ${i/100} seconds          
        ╚════════════════════════╩════════════════════════╝`)
                                // console.log(`${subjectAddress} has ${openPorts.length} open ports and ${closedPorts.length} closed ports`)

                        }
                    }
                }

                // this function will create a new worker for scanning ports.
                async function concurrencyWorker(workerStatus, openPorts, closedPorts) {
                    concurrencyStartEvent(workerStatus)

                    while (true) {
                        const port = pullPort()
                        if (port === null) {
                            break
                        }

                        const result = await testPort(port)
                        workerStatus.scannedPorts.push(port)

                        if (result === port) {
                            openPorts.push(port)
                        } else {
                            closedPorts.push(port)
                        }
                    }

                    concurrencyEndEvent(workerStatus)
                }


                function testPort(port) {
                    return new Promise((resolve, reject) => {
                        const sock = new net.Socket()
                        sock.setTimeout(verifyTimeout)
                        // add verbosity option later

                        sock.on('timeout', () => {
                            //console.log('sock timed out')
                            resolve(null)
                            sock.destroy()
                        })

                        sock.on('error', (err) => {
                            //console.log('sock error')
                            resolve(null)
                            sock.destroy()
                        })

                        sock.on('connect', () => {
                            //console.log('sock connected')
                            resolve(port)
                            sock.end()
                        })

                        sock.connect(port, subjectAddress)
                    })
                }


                function pullPort() {
                    if (typeof global.portIncrement === 'undefined') {
                        return global.portIncrement = 1
                    }

                    ++global.portIncrement

                    if (global.portIncrement > 65535) {
                        return null
                    }

                    return global.portIncrement
                }

                // creating the concurrency for scanning ports, concurrency is determined by
                // concurrentScanLimit
                for (let i = 0; i < verifyConcurrent; i++) {
                    workerStatuses[i] = {
                        id: i,
                        idPrint: `#${i}`,
                        scannedPorts: [],
                    }

                    setImmediate(
                        concurrencyWorker,
                        workerStatuses[i],
                        openPorts,
                        closedPorts
                    )
                }
                console.clear();
                console.log(`
      ╔════════════════════════╦════════════════════════╗
               Target address: ║ ${subjectAddress}       
      ╠════════════════════════╬════════════════════════╣
        Concurrent scan limit: ║ ${concurrentScanLimit}  
      ╠════════════════════════╬════════════════════════╣
                 Sock timeout: ║ ${sockTimeout}          
      ╚════════════════════════╩════════════════════════╝`)


            })
        })
    })
}


startupScreen()
setTimeout(() => {
    clearInterval(totalTime)

}, 3000)

setTimeout(() => {
    questions()
}, 3100)
