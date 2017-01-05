package com.example.tchaokko.foodheaven;

/**
 * Created by Tchaokko on 05/01/2017.
 */

import org.json.*;
import com.loopj.android.http.*;
import android.preference.PreferenceActivity.Header;

public class ApiClassUsage {

    public void FirstConnexion(JSONArray infoUser) throws JSONException {
        RequestParams params = new RequestParams();
        params.put("data", infoUser);
        httpConnexionManager.get("api/test", params, new JsonHttpResponseHandler() {
            @Override
            public void onSuccess(int statusCode, Header[] headers, JSONObject response) {
                // If the response is JSONObject instead of expected JSONArray
            }

            @Override
            public void onSuccess(int statusCode, Header[] headers, JSONArray response) {
                //if the response is a JSON ARRAY
                //TODO RECUP KEY
            }
        });
    }

    public void getRecipySimple(JSONArray infoRecipy) throws JSONException {
        RequestParams params = new RequestParams();
        params.put("data", infoRecipy);
        httpConnexionManager.get("api/test", params, new JsonHttpResponseHandler() {
            @Override
            public void onSuccess(int statusCode, Header[] headers, JSONObject response) {
                // If the response is JSONObject instead of expected JSONArray
            }

            @Override
            public void onSuccess(int statusCode, Header[] headers, JSONArray response) {
                //if the response is a JSON ARRAY
                // TODO AFF SIMPLE RECIPY
            }
        });
    }

    public void getRecipyDetail(JSONArray infoRecipy) throws JSONException {
        RequestParams params = new RequestParams();
        params.put("data", infoRecipy);
        httpConnexionManager.get("api/test", params, new JsonHttpResponseHandler() {
            @Override
            public void onSuccess(int statusCode, Header[] headers, JSONObject response) {
                // If the response is JSONObject instead of expected JSONArray
            }

            @Override
            public void onSuccess(int statusCode, Header[] headers, JSONArray response) {
                //if the response is a JSON ARRAY
                //TODO USE THE DETAIL OF THE RECIPY
            }
        });
    }

    public void getRecipyHome() throws JSONException {
        RequestParams params = new RequestParams();
        //TODO CREATE PARAMS FOR RECIPY HOME
        httpConnexionManager.get("api/test", params, new JsonHttpResponseHandler() {
            @Override
            public void onSuccess(int statusCode, Header[] headers, JSONObject response) {
                // If the response is JSONObject instead of expected JSONArray
            }

            @Override
            public void onSuccess(int statusCode, Header[] headers, JSONArray response) {
                //if the response is a JSON ARRAY
                // TODO AFF HOME RECIPY
            }
        });
    }
}

