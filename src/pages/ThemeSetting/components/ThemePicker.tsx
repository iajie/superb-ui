import { THEMELIST } from "../props";
interface ThemePickerProps {
    /** 主题值 */
    value?: string;
    /**
     * 点击事件
     * @param value 点击值
     * @returns 
     */
    onChange?: (value: any) => void;
}
//导出类型
import { CheckCard } from "@ant-design/pro-components";

export default ({ value, onChange }: ThemePickerProps) => {

    return <CheckCard.Group value={value} onChange={onChange}>
        { THEMELIST.map((th: any) => <CheckCard key={th.name} value={th.theme} style={{ width: 140, height: 120 }} cover={<div style={{ textAlign: 'center' }}>
            <img src={th.svg} alt={th.theme} />
            <span>{th.name}</span>
        </div>}/> ) }
    </CheckCard.Group>

}