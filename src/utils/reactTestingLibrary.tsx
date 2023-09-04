import {
  FC,
  JSXElementConstructor,
  PropsWithChildren,
  ReactElement,
} from 'react'
// This is the only file we want to import from @testing-library/react,
// other uses must use this file as a wrapper

/* eslint-disable import/no-extraneous-dependencies */
import {
  Matcher,
  render,
  RenderOptions,
  RenderResult,
  screen,
} from '@testing-library/react'
import userEvent, { PointerEventsCheckLevel } from '@testing-library/user-event'
import { match } from 'css-mediaquery'

// eslint-disable-next-line no-restricted-imports
export * from '@testing-library/react'

export type UserType = ReturnType<typeof userEvent.setup>

export type RenderFunc = (
  ui: ReactElement,
  options?: RenderOptions,
  wrapper?: JSXElementConstructor<{ children: ReactElement }>
) => RenderResult & { user: UserType }

export const createMatchMedia = (
  width: number
): ((query: string) => MediaQueryList) => {
  const noop = () => {
    // do nothing
  }

  return (query) =>
    ({
      matches: match(query, { width }),
      addListener: noop,
      removeListener: noop,
    } as unknown as MediaQueryList)
}

const getResponsiveWrapper =
  (width: number): FC<PropsWithChildren> =>
  // eslint-disable-next-line react/prop-types
  ({ children }) => {
    window.matchMedia = createMatchMedia(width)

    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{children}</>
  }

const MobileWrapper = getResponsiveWrapper(414)
const DesktopWrapper = getResponsiveWrapper(1024)

const customRender: RenderFunc = (ui, options, wrapper) => ({
  user: userEvent.setup({
    pointerEventsCheck: PointerEventsCheckLevel.Never,
  }),
  ...render(ui, { wrapper, ...options }),
})

const renderMobile: RenderFunc = (ui, options?) =>
  customRender(ui, options, MobileWrapper)
const renderDesktop: RenderFunc = (ui, options?) =>
  customRender(ui, options, DesktopWrapper)

// override render method
export { renderDesktop, renderMobile, renderMobile as render }

class LoremIpsum {
  readonly text: string =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quisque egestas diam in arcu. Malesuada bibendum arcu vitae elementum curabitur vitae nunc. Integer feugiat scelerisque varius morbi enim nunc. Morbi tristique senectus et netus et malesuada fames ac. Integer feugiat scelerisque varius morbi. Dolor sed viverra ipsum nunc aliquet bibendum enim. Eget arcu dictum varius duis at consectetur lorem donec. Gravida neque convallis a cras semper auctor neque vitae tempus. Porta non pulvinar neque laoreet suspendisse interdum. Mauris ultrices eros in cursus turpis massa tincidunt dui. Elementum pulvinar etiam non quam lacus suspendisse. Amet nulla facilisi morbi tempus iaculis. A lacus vestibulum sed arcu non odio. Vel facilisis volutpat est velit egestas dui. Molestie a iaculis at erat. Vehicula ipsum a arcu cursus. Bibendum ut tristique et egestas quis.' +
    'Felis imperdiet proin fermentum leo vel orci porta non pulvinar. Eu turpis egestas pretium aenean pharetra magna. Aliquam nulla facilisi cras fermentum odio. Proin fermentum leo vel orci. Commodo quis imperdiet massa tincidunt nunc pulvinar sapien. Mi sit amet mauris commodo quis imperdiet massa tincidunt. Enim facilisis gravida neque convallis. Amet nulla facilisi morbi tempus iaculis urna. Interdum velit laoreet id donec. Massa tempor nec feugiat nisl pretium fusce id. Ut morbi tincidunt augue interdum velit euismod. Aenean euismod elementum nisi quis eleifend quam adipiscing vitae. Id diam maecenas ultricies mi eget. Risus in hendrerit gravida rutrum quisque. Scelerisque eu ultrices vitae auctor eu augue ut lectus arcu. Pretium quam vulputate dignissim suspendisse.' +
    'Ultrices neque ornare aenean euismod elementum nisi. Et netus et malesuada fames. Risus ultricies tristique nulla aliquet enim tortor at auctor urna. Nisl pretium fusce id velit ut tortor. Cursus sit amet dictum sit amet justo donec enim. Congue mauris rhoncus aenean vel elit scelerisque mauris pellentesque. Quis enim lobortis scelerisque fermentum dui faucibus in ornare. Enim facilisis gravida neque convallis. Diam maecenas ultricies mi eget mauris pharetra et ultrices. Condimentum lacinia quis vel eros donec ac. Nunc id cursus metus aliquam eleifend mi in nulla posuere. Lectus magna fringilla urna porttitor rhoncus. Fringilla urna porttitor rhoncus dolor purus non enim praesent elementum. Ut etiam sit amet nisl purus in. Egestas congue quisque egestas diam in arcu. Sed sed risus pretium quam. Ultricies integer quis auctor elit sed vulputate mi sit amet. Commodo sed egestas egestas fringilla phasellus. Mattis rhoncus urna neque viverra justo nec ultrices.' +
    'Aliquet lectus proin nibh nisl. Varius vel pharetra vel turpis nunc eget lorem dolor. Sed risus pretium quam vulputate dignissim. Ipsum dolor sit amet consectetur adipiscing elit ut aliquam. Cursus sit amet dictum sit amet justo donec enim. Tempor id eu nisl nunc mi ipsum faucibus vitae aliquet. Scelerisque felis imperdiet proin fermentum. Nec nam aliquam sem et tortor consequat id. Sit amet mattis vulputate enim nulla aliquet. Lobortis feugiat vivamus at augue eget arcu. A arcu cursus vitae congue mauris rhoncus aenean vel. Gravida neque convallis a cras semper auctor neque. Viverra suspendisse potenti nullam ac tortor vitae. Ut placerat orci nulla pellentesque dignissim enim sit amet venenatis.' +
    'Consequat ac felis donec et odio pellentesque diam. Vel turpis nunc eget lorem dolor sed. At quis risus sed vulputate odio ut enim. Pulvinar elementum integer enim neque. Dapibus ultrices in iaculis nunc sed augue lacus viverra vitae. Commodo quis imperdiet massa tincidunt nunc pulvinar sapien et ligula. Eu non diam phasellus vestibulum. At quis risus sed vulputate odio ut enim blandit volutpat. Nec sagittis aliquam malesuada bibendum arcu vitae. Id nibh tortor id aliquet lectus proin. Quis hendrerit dolor magna eget est. Rutrum quisque non tellus orci. Aliquet nibh praesent tristique magna sit amet purus. Congue quisque egestas diam in arcu. Aliquam id diam maecenas ultricies mi eget mauris pharetra et. Quis lectus nulla at volutpat diam ut.' +
    'Cursus euismod quis viverra nibh cras pulvinar mattis nunc sed. Vulputate mi sit amet mauris. Imperdiet proin fermentum leo vel. Diam ut venenatis tellus in metus vulputate eu scelerisque. Vivamus at augue eget arcu dictum varius duis. Urna cursus eget nunc scelerisque. Elementum nisi quis eleifend quam. Viverra mauris in aliquam sem fringilla ut. Scelerisque felis imperdiet proin fermentum leo vel orci. Aenean sed adipiscing diam donec adipiscing tristique risus nec. Magna sit amet purus gravida quis. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt.' +
    'Ipsum faucibus vitae aliquet nec. Sed blandit libero volutpat sed cras ornare. Nam aliquam sem et tortor consequat id porta. Ac turpis egestas integer eget aliquet nibh praesent. Porta non pulvinar neque laoreet suspendisse interdum consectetur libero id. Et molestie ac feugiat sed lectus vestibulum. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo vel. Risus at ultrices mi tempus imperdiet nulla malesuada pellentesque elit. At ultrices mi tempus imperdiet. Amet venenatis urna cursus eget nunc scelerisque viverra. In cursus turpis massa tincidunt. Lectus urna duis convallis convallis tellus id interdum. Quisque sagittis purus sit amet volutpat consequat mauris nunc congue.' +
    'Felis bibendum ut tristique et egestas quis ipsum suspendisse. Eget gravida cum sociis natoque. Tristique senectus et netus et malesuada fames. Adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna. Felis bibendum ut tristique et egestas quis ipsum. Quis varius quam quisque id diam vel quam elementum. Vel eros donec ac odio. Purus semper eget duis at tellus at urna condimentum. Condimentum id venenatis a condimentum vitae sapien pellentesque habitant. Odio eu feugiat pretium nibh ipsum consequat. Tristique et egestas quis ipsum suspendisse. Facilisis volutpat est velit egestas dui. Sagittis id consectetur purus ut faucibus pulvinar. Interdum posuere lorem ipsum dolor sit amet consectetur.'

  generateSentences(count: number): string {
    return `${this.text.split('.').slice(0, count).join()}.`
  }

  generateParagraphs(count: number): string {
    return `${this.text
      .split('.')
      .slice(0, count * 5)
      .join()}.`
  }
}

export const loremIpsum = new LoremIpsum()

export const getLoremPicture = (
  id: string,
  width = 140,
  height = 140
): string => `https://picsum.photos/id/${id}/${width}/${height}`

export const getContainerWithTestId = (
  element: HTMLElement,
  testId: string
): HTMLElement | null => element.closest(`[data-test=${testId}]`)

type ByTitleOption = {
  name:
    | RegExp
    | string
    | ((accessibleName: string, element: Element) => boolean)
  level?: number
}

export const findDialogByTitle = async (
  byTitle: ByTitleOption
): Promise<Element | null> => {
  const title = await screen.findByRole('heading', byTitle)

  return title.closest('[role="dialog"]')
}

export const findDialogByText = async (
  id: Matcher
): Promise<Element | null> => {
  const title = await screen.findByText(id, {
    selector: ':not([aria-hidden="true"])',
  })

  return title.closest('[role="dialog"]')
}
