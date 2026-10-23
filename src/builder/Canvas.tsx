import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  BranchesOutlined,
  CopyOutlined,
  DeleteOutlined,
  EyeInvisibleOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import { Button, Card, Empty, Input, Space, Tag, Tooltip, Typography } from 'antd';
import type { Template } from '../domain/template';
import { modelOf } from '../fields/models';
import { viewOf } from '../fields/views';
import type { TemplateIssue } from '../logic/template';
import type { BuilderAction } from './reducer';

interface CanvasProps {
  template: Template;
  selectedId: string | null;
  issues: readonly TemplateIssue[];
  dispatch: (action: BuilderAction) => void;
}

export function Canvas({ template, selectedId, issues, dispatch }: CanvasProps) {
  const { fields } = template;
  const issuesFor = (id: string) => issues.filter((i) => i.fieldId === id);

  return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <Input.TextArea
        aria-label="Form description"
        placeholder="Add a description (optional)"
        autoSize={{ minRows: 1, maxRows: 4 }}
        variant="borderless"
        value={template.description ?? ''}
        onChange={(e) => dispatch({ type: 'setDescription', description: e.target.value })}
        style={{ marginBottom: 12 }}
      />

      {fields.length === 0 && (
        <Empty description="Add a field from the left to get started" style={{ marginTop: 80 }} />
      )}

      <Space direction="vertical" size={12} style={{ width: '100%' }}>
        {fields.map((field, index) => {
          const model = modelOf(field);
          const View = viewOf(field).Input;
          const selected = field.id === selectedId;
          const fieldIssues = issuesFor(field.id);
          return (
            <Card
              key={field.id}
              size="small"
              data-testid={`canvas-field-${field.id}`}
              aria-current={selected}
              hoverable
              onClick={() => dispatch({ type: 'select', id: field.id })}
              style={{
                borderColor: selected ? '#4f46e5' : fieldIssues.length ? '#ff4d4f' : undefined,
                boxShadow: selected ? '0 0 0 2px rgba(79,70,229,.15)' : undefined,
              }}
              title={
                <Space size={6} wrap>
                  <Typography.Text strong>
                    {field.label || 'Untitled'}
                    {field.required && <span style={{ color: '#ff4d4f' }}> *</span>}
                  </Typography.Text>
                  <Tag bordered={false}>{model.title}</Tag>
                  {!field.visible && (
                    <Tooltip title="Hidden by default">
                      <Tag bordered={false} icon={<EyeInvisibleOutlined />}>Hidden</Tag>
                    </Tooltip>
                  )}
                  {field.rules.length > 0 && (
                    <Tooltip title="Has conditional rules">
                      <Tag bordered={false} color="purple" icon={<BranchesOutlined />}>{field.rules.length}</Tag>
                    </Tooltip>
                  )}
                  {fieldIssues.length > 0 && (
                    <Tooltip title={fieldIssues.map((i) => i.message).join(' · ')}>
                      <Tag color="error" icon={<WarningOutlined />}>{fieldIssues.length}</Tag>
                    </Tooltip>
                  )}
                </Space>
              }
              extra={
                <Space size={0} onClick={(e) => e.stopPropagation()}>
                  <Button
                    type="text"
                    size="small"
                    aria-label={`Move ${field.label} up`}
                    icon={<ArrowUpOutlined />}
                    disabled={index === 0}
                    onClick={() => dispatch({ type: 'moveField', id: field.id, delta: -1 })}
                  />
                  <Button
                    type="text"
                    size="small"
                    aria-label={`Move ${field.label} down`}
                    icon={<ArrowDownOutlined />}
                    disabled={index === fields.length - 1}
                    onClick={() => dispatch({ type: 'moveField', id: field.id, delta: 1 })}
                  />
                  <Button
                    type="text"
                    size="small"
                    aria-label={`Duplicate ${field.label}`}
                    icon={<CopyOutlined />}
                    onClick={() => dispatch({ type: 'duplicateField', id: field.id })}
                  />
                  <Button
                    type="text"
                    size="small"
                    danger
                    aria-label={`Delete ${field.label}`}
                    icon={<DeleteOutlined />}
                    onClick={() => dispatch({ type: 'removeField', id: field.id })}
                  />
                </Space>
              }
            >
              {/* A non-interactive rendering of the real input, so the canvas matches Fill Mode. */}
              <div style={{ pointerEvents: 'none' }} aria-hidden>
                <View
                  config={field}
                  value={undefined}
                  onChange={() => undefined}
                  required={field.required}
                  disabled
                  inputId={`canvas-${field.id}`}
                />
              </div>
            </Card>
          );
        })}
      </Space>
    </div>
  );
}
