import { useState } from 'react';

type Field = {
  /** Gravity Forms field number (input_1, input_2 …). */
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea';
  /** Grid class from the original markup: gf_left_third / gf_middle_third / gf_right_third. */
  width?: string;
  rows?: number;
  cols?: number;
};

/**
 * Form 1 = the “Free Online Estimate” form (home, free-estimate and every
 * location page). Form 2 = the smaller contact form on /contact/.
 */
const FORMS: Record<number, { action: string; fields: Field[] }> = {
  1: {
    action: '',
    fields: [
      { name: 'input_1', label: 'Name', type: 'text', width: 'gf_left_third' },
      { name: 'input_2', label: 'Email', type: 'email', width: 'gf_middle_third' },
      { name: 'input_3', label: 'Phone', type: 'tel', width: 'gf_right_third' },
      { name: 'input_6', label: 'Year Of Car?', type: 'text', width: 'gf_left_third' },
      { name: 'input_4', label: 'Make Of Car?', type: 'text', width: 'gf_middle_third' },
      { name: 'input_7', label: 'Model Of Car?', type: 'text', width: 'gf_right_third' },
      {
        name: 'input_8',
        label: 'What Hybrid Issues Are You Having?',
        type: 'textarea',
        rows: 10,
        cols: 50,
      },
    ],
  },
  2: {
    action: '/contact/',
    fields: [
      { name: 'input_1', label: 'Name', type: 'text' },
      { name: 'input_2', label: 'Email', type: 'email' },
      { name: 'input_3', label: 'Phone', type: 'tel' },
      { name: 'input_4', label: 'Message', type: 'textarea', rows: 10, cols: 50 },
    ],
  },
};

type Props = {
  formId?: number;
  /** Overrides the form action — the original posts back to the current URL. */
  action?: string;
};

export default function ContactForm({ formId = 1, action }: Props) {
  const cfg = FORMS[formId] ?? FORMS[1];
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const fieldClass = (f: Field) =>
    [
      'gfield',
      `gfield--type-${f.type}`,
      'field_sublabel_below',
      'gfield--no-description',
      'field_description_below',
      'field_validation_below',
      'gfield_visibility_visible',
      f.width ?? '',
    ]
      .filter(Boolean)
      .join(' ');

  return (
    <div className="gf_browser_chrome gform_wrapper gform_legacy_markup_wrapper gform-theme--no-framework">
      <form
        method="post"
        enctype="multipart/form-data"
        id={`gform_${formId}`}
        action={action ?? cfg.action}
        data-formid={formId}
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          setStatus('sending');
          // The live site posts to Gravity Forms on the WordPress backend.
          // Point FORM_ENDPOINT at that URL (or a proxy) to receive submissions.
          const endpoint = import.meta.env.PUBLIC_FORM_ENDPOINT;
          if (!endpoint) {
            setStatus('sent');
            return;
          }
          const data = new FormData(e.currentTarget);
          fetch(endpoint, { method: 'POST', body: data })
            .then(() => setStatus('sent'))
            .catch(() => setStatus('idle'));
        }}
      >
        <div className="gform-body gform_body">
          <ul
            id={`gform_fields_${formId}`}
            className="gform_fields top_label form_sublabel_below description_below validation_below"
          >
            {cfg.fields.map((f) => (
              <li key={f.name} id={`field_${formId}_${f.name.replace('input_', '')}`} className={fieldClass(f)}>
                <label className="gfield_label gform-field-label" htmlFor={`input_${formId}_${f.name.replace('input_', '')}`}>
                  {f.label}
                </label>
                <div className={`ginput_container ginput_container_${f.type}`}>
                  {f.type === 'textarea' ? (
                    <textarea
                      name={f.name}
                      id={`input_${formId}_${f.name.replace('input_', '')}`}
                      className="textarea medium"
                      aria-invalid="false"
                      rows={f.rows ?? 10}
                      cols={f.cols ?? 50}
                    />
                  ) : (
                    <input
                      name={f.name}
                      id={`input_${formId}_${f.name.replace('input_', '')}`}
                      type={f.type}
                      value=""
                      className="medium"
                      aria-invalid="false"
                    />
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="gform-footer gform_footer top_label">
          <input
            type="submit"
            id={`gform_submit_button_${formId}`}
            className="gform_button button"
            data-submission-type="submit"
            value="Submit"
          />
          <input
            type="hidden"
            className="gform_hidden"
            name="gform_submission_method"
            data-js={`gform_submission_method_${formId}`}
            value="postback"
          />
          <input
            type="hidden"
            className="gform_hidden"
            name="gform_theme"
            data-js={`gform_theme_${formId}`}
            id={`gform_theme_${formId}`}
            value="legacy"
          />
          <input type="hidden" className="gform_hidden" name="gform_style_settings" value="[]" />
          <input type="hidden" className="gform_hidden" name={`is_submit_${formId}`} value="1" />
          <input type="hidden" className="gform_hidden" name="gform_submit" value={String(formId)} />
          <input type="hidden" className="gform_hidden" name="gform_unique_id" value="" />
          <input type="hidden" className="gform_hidden" name="gform_field_values" value="" />
        </div>

        {status === 'sent' && (
          <p className="gform_confirmation_message" role="status">
            Thanks! We received your request and will be in touch shortly.
          </p>
        )}
      </form>
    </div>
  );
}
