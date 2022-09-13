import { useContext } from 'react';
import { FeatureTogglesContext } from '../components/FeatureTogglesContext';

export const useFeatureToggles = (
	toggleName,
	validate = (value) => !!value
) => {
	const { toggles } = useContext(FeatureTogglesContext);

	const toggle = {
		value: toggles[toggleName],
		onValid: function (cb) {
			validate(this.value) && cb();

			return this;
		},
		onInvalid: function (cb) {
			!validate(this.value) && cb();

			return this;
		},
	};

	return toggle;
};
