import { ColorPicker, Input, Space } from "antd";

interface ColorPickerProps {
    value?: string;
    onChange?: (value: string) => void;
}

export default ({ value, onChange }: ColorPickerProps) => {
    return <Space>
        <Input value={value} onChange={(event) => { onChange?.(event.target.value); }} style={{ width: 120 }} />
        <ColorPicker defaultValue={value} onChange={ (value, hex) => onChange?.(hex) } showText={(color) => <span>颜色 ({color.toHexString()})</span>} />
    </Space>
}