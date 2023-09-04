import { format } from 'util'

// Remove "Error: Not implemented: window.scrollTo"
const noop = () => {}
Object.defineProperty(window, 'scrollTo', { value: noop, writable: true })

// Transform some logs into exceptions
const nativeConsoleError = console.error

// Stub scrollIntoView
window.HTMLElement.prototype.scrollIntoView = jest.fn()

console.error = (...args) => {
    // Keep default behaviour
    nativeConsoleError.apply(console, args)

    if (typeof args[0] === 'string') {
        const message = args[0]

        if (
            message.startsWith('Warning: A component is changing an uncontrolled input to be controlled') ||
            message.startsWith('Warning: Encountered two children with the same key') ||
            message.startsWith('Warning: Each child in a list should have a unique "key" prop') ||
            message.startsWith('Warning: React does not recognize the `%s` prop on a DOM element.')
        ) {
            throw new Error(format(...args))
        }
        // Add other behaviors here
    }
}

process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason)
    console.log('Unhandled Rejection stack', (reason)?.stack)
})
