import { getQueryParams } from './getQueryParams';

/**
 * Function to add query string parameters to URL
 * @param params
 */
export function addQueryParams(params: OptionalRecord<string, string>) {
    window.history.pushState(null, '', getQueryParams(params));
}
