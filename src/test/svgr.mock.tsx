import { SVGProps, FunctionComponent } from 'react'

type MockSVGProps = SVGProps<SVGSVGElement>

const stringStub = 'SVG'
export default stringStub
export const ReactComponent: FunctionComponent<MockSVGProps> = (
  props: MockSVGProps
) => <svg {...props} />
