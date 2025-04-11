import { Input } from "antd";

const AntInput = ({
  value,
  onChange,
  placeholder = "Enter text",
  size = "middle", // can be 'small' | 'middle' | 'large'
  prefix,
  suffix,
  type = "text",
  disabled = false,
  allowClear = true,
  style = {},
  ...rest
}) => {
  return (
    <Input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      size={size}
      prefix={prefix}
      suffix={suffix}
      type={type}
      disabled={disabled}
      allowClear={allowClear}
      style={{ width: "100%", ...style }}
      {...rest}
    />
  );
};

export default AntInput;
