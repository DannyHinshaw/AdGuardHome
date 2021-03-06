import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Trans, withNamespaces } from 'react-i18next';
import flow from 'lodash/flow';

import { renderInputField, required, domain, answer } from '../../../helpers/form';

const Form = (props) => {
    const {
        t,
        handleSubmit,
        reset,
        pristine,
        submitting,
        toggleRewritesModal,
        processingAdd,
    } = props;

    return (
        <form onSubmit={handleSubmit}>
            <div className="modal-body">
                <div className="form__desc form__desc--top">
                    <Trans>domain_desc</Trans>
                </div>
                <div className="form__group">
                    <Field
                        id="domain"
                        name="domain"
                        component={renderInputField}
                        type="text"
                        className="form-control"
                        placeholder={t('form_domain')}
                        validate={[required, domain]}
                    />
                </div>

                <Trans>examples_title</Trans>:
                <ol className="leading-loose">
                    <li>
                        <code>example.org</code> – <Trans>example_rewrite_domain</Trans>
                    </li>
                    <li>
                        <code>*.example.org</code> –&nbsp;
                        <span>
                            <Trans components={[<code key="0">text</code>]}>
                                example_rewrite_wildcard
                            </Trans>
                        </span>
                    </li>
                </ol>

                <div className="form__group">
                    <Field
                        id="answer"
                        name="answer"
                        component={renderInputField}
                        type="text"
                        className="form-control"
                        placeholder={t('form_answer')}
                        validate={[required, answer]}
                    />
                </div>
            </div>

            <div className="modal-footer">
                <div className="btn-list">
                    <button
                        type="button"
                        className="btn btn-secondary btn-standard"
                        disabled={submitting || processingAdd}
                        onClick={() => {
                            reset();
                            toggleRewritesModal();
                        }}
                    >
                        <Trans>cancel_btn</Trans>
                    </button>
                    <button
                        type="submit"
                        className="btn btn-success btn-standard"
                        disabled={submitting || pristine || processingAdd}
                    >
                        <Trans>save_btn</Trans>
                    </button>
                </div>
            </div>
        </form>
    );
};

Form.propTypes = {
    pristine: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    toggleRewritesModal: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    processingAdd: PropTypes.bool.isRequired,
    t: PropTypes.func.isRequired,
};

export default flow([
    withNamespaces(),
    reduxForm({
        form: 'rewritesForm',
        enableReinitialize: true,
    }),
])(Form);
