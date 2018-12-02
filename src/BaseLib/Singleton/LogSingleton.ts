import { Log } from './Log';

interface LogEntry {
    object: string;
    type: 'INFO' | 'WARNING' | 'ERROR';
    message: any;
}

var LOG = (function () {
    /**
     *  STORE THE INSTANCE
     */
    var instance;

    function init(): Log {
        console.clear();
        /**
         *  PRIVATE ATTRIBUTES OF THE SINGLETON
         */
        var show_log = false;
        var logs = [];

        /**
         *  PRIVATE METHODS OF THE SINGLETON
         */
        function printLog(log: LogEntry) {
            if (show_log) {
                switch (log.type) {
                    case 'INFO': {
                        if (typeof log.message === 'number' || typeof log.message === 'string') {
                            console.log('[' + getTime() + '][' + log.type + '][' + log.object + ']: ' + log.message)
                        } else {
                            console.log('[' + getTime() + '][' + log.type + '][' + log.object + ']: ', log.message)
                        }
                        break;
                    }
                    case 'WARNING': {
                        if (typeof log.message === 'number' || typeof log.message === 'string') {
                            console.warn('[' + getTime() + '][' + log.type + '][' + log.object + ']: ' + log.message)
                        } else {
                            console.warn('[' + getTime() + '][' + +log.type + '][' + log.object + ']: ', log.message)
                        }
                        break;
                    }
                    case 'ERROR': {
                        if (typeof log.message === 'number' || typeof log.message === 'string') {
                            console.error('[' + getTime() + '][' + log.type + '][' + log.object + ']: ' + log.message)
                        } else {
                            console.error('[' + getTime() + '][' + log.type + '][' + log.object + ']: ', log.message)
                        }
                        break;
                    }
                }
            }
        }

        function getTime() {
            let now = new Date();
            return now.getMinutes() + ':' + now.getSeconds();
        }

        /**
         *  PUBLIC METHODS OF THE SINGLETON
         */
        return {

            info(object: string, message: any) {
                let log: LogEntry = {
                    object,
                    type: 'INFO',
                    message
                };
                logs.push(log);
                printLog(log);
            },
            warning(object: string, message: any) {
                let log: LogEntry = {
                    object,
                    type: 'WARNING',
                    message
                };
                logs.push(log);
                printLog(log);
            },
            error(object: string, message: any, throwE: boolean) {
                let log: LogEntry = {
                    object,
                    type: 'ERROR',
                    message
                };
                logs.push(log);
                printLog(log);
                if (throwE) {
                    throw Error('[SYSTEM]: STOP!')
                }
            },
            hide_logs() {
                show_log = false;
            },
            show_logs() {
                show_log = true;
            }
        };
    }

    /**
     *  CREATOR FUNCTION TO GET THE SAME INSTANCE OF THE SINGLETON!
     */
    return {
        // Get the Singleton instance if one exists
        // or create one if it doesn't
        getInstance: function () {
            if (!instance) {
                instance = init();
            }
            return instance;
        }
    };
})();
export default LOG;