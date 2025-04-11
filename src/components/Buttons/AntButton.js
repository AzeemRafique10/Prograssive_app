import { Button } from "antd";

const AntButton = ({
  label,
  type = "primary", // 'default' | 'primary' | 'dashed' | 'text' | 'link'
  htmlType = "button", // 'button' | 'submit' | 'reset'
  onClick,
  loading = false,
  disabled = false,
  icon,
  shape, // 'circle' | 'round'
  size = "middle", // 'small' | 'middle' | 'large'
  block = false,
  danger = false,
  children,
  style = {},
  onSubmit,
  ...rest
}) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      loading={loading}
      disabled={disabled}
      icon={icon}
      shape={shape}
      size={size}
      block={block}
      danger={danger}
      style={style}
      onSubmit={onSubmit}
      {...rest}
    >
      {label}
    </Button>
  );
};

export default AntButton;
