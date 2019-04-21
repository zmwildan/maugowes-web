import Dayjs from "dayjs"
import RelativeTime from "dayjs/plugin/relativeTime"
import "dayjs/locale/id"

Dayjs.extend(RelativeTime)
Dayjs.locale("id")

export default Dayjs