<?php
if (!defined('ABSPATH')) :
	exit;
endif;
function ___tagembed__wpApiCall($apiUrl, $body, $header = null)
{
	$header   = (null != $header ? $header : []);
	$args     = ['body' => $body, 'timeout' => '30', 'redirection' => '5', 'httpversion' => '1.0', 'blocking' => true, 'headers' => $header, 'cookies' => []];
	$response = wp_remote_post($apiUrl, $args);
	if (is_wp_error($response)) :
		return;
	endif;
	if (isset($response['body']) && !empty($response['body'])) :
		return json_decode($response['body']);
	endif;
	return;
}
function ___tagembed__manageApiResponse($response)
{
	if (empty($response->head)) :
		return ___tagembed__exitWithDanger();
	endif;
	$responseCode = $response->head->code;
	switch ($responseCode) {
		case 200:
			if ($response->head->status) :
				if (!empty($response->body)) :
					return $response->body;
				endif;
				if (!empty($response->head->message)) :
					return ___tagembed__exitWithSuccess($response->head->message);
				else :
					return ___tagembed__exitWithSuccess();
				endif;
			else :
				if (!empty($response->head->message)) :
					return ___tagembed__exitWithDanger($response->head->message);
				else :
					return ___tagembed__exitWithDanger();
				endif;
			endif;
			break;
		case 412:
			/* --Start-- Manage Validation Error */
			if (empty($response->body)) :
				return ___tagembed__exitWithDanger();
			else :
				return ___tagembed__exitWithDanger('Validation Error', $response->body);
			endif;
			/* --End-- Manage Validation Error */
			break;
		default:
			if (!empty($response->head->message)) :
				return ___tagembed__exitWithDanger($response->head->message);
			else :
				return ___tagembed__exitWithDanger();
			endif;
	}
}

function ___tagembed__exitWithSuccess($data = null)
{
	wp_send_json(['status' => (bool)true, 'data' => (array)$data, 'message' => (string)'OK']);
}
function ___tagembed__exitWithDanger($error = null, $data = [])
{
	wp_send_json(['status' => (bool)false, 'data' => (array)$data, 'message' => (string)('' != $error ? $error : 'Oh snap! Something went wrong.')]);
}

/* --Start__ Sanetize All Input */
function ___tagembed__inputSanetize($data)
{
	if (is_array($data)) :
		foreach ($data as $__tagembed__input_sanetize_item) :
			___tagembed__inputSanetize($__tagembed__input_sanetize_item);
		endforeach;
		return;
	endif;
	$data = (string)$data;
	if (preg_match('/<[^>]*>/', $data)) :
		return ___tagembed__exitWithDanger('Special characters  are not allowed. Please remove them and try again.');
	endif;
}
/* --End Sanetize All Input */
/* --Start-- Sanitize Request Data */
function ___tagembed__sanitizeRequestData($__tagembed__request_input_data)
{
	$__tagembed__Input_return_data = [];
	foreach ($__tagembed__request_input_data as $__tagembed__request_input_key => $__tagembed__request_input) :
		if (is_array($__tagembed__request_input)) :
			$__tagembed__Input_return_data[$__tagembed__request_input_key] = ___tagembed__sanitizeRequestData($__tagembed__request_input);
		else :
			$__tagembed__Input_return_data[$__tagembed__request_input_key] = sanitize_text_field($__tagembed__request_input);
		endif;
	endforeach;
	return $__tagembed__Input_return_data;
}
/*--End-- Sanitize Request Data*/
