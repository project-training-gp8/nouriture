package com.example.tchaokko.foodheaven;

/**
 * Created by Tchaokko on 05/01/2017.
 */

import android.content.Context;
import android.content.ContextWrapper;
import android.view.View;

import org.json.*;
import com.loopj.android.http.*;
import cz.msebera.android.httpclient.*;


public class ApiClassUsage {

    public static void Register(String[] arrayParams,  final RegisterActivity2 test) throws JSONException {
        RequestParams params = new RequestParams();
        params.put("firstName", arrayParams[0]);
        params.put("lastName", arrayParams[1]);
        params.put("email", arrayParams[2]);
        params.put("password", arrayParams[3]);
        httpConnexionManager.post("/api/user", params, new JsonHttpResponseHandler() {
            @Override
            public void onSuccess(int statusCode, Header[] headers, JSONObject response) {
                // If the response is JSONObject instead of expected JSONArray
                test.sucessRegistration();
            }

            @Override
            public void onSuccess(int statusCode, Header[] headers, JSONArray response) {
                //if the response is a JSON ARRAY
                //TODO RECUP KEY
            }
            @Override
            public void onFailure(int statusCode, Header[] headers, Throwable throwable, JSONObject errorResponse){
                String test =new String();

            }
        });
    }

    public static void Login(String[] arrayParams,  final LoginActivity test) throws JSONException {
        RequestParams params = new RequestParams();
        params.put("email", arrayParams[0]);
        params.put("password", arrayParams[1]);
        httpConnexionManager.post("/api/login", params, new JsonHttpResponseHandler() {
            @Override
            public void onSuccess(int statusCode, Header[] headers, JSONObject response) {
                // If the response is JSONObject instead of expected JSONArray

                test.launchMainpageBackup();
            }

            @Override
            public void onSuccess(int statusCode, Header[] headers, JSONArray response) {
                //if the response is a JSON ARRAY
                //TODO RECUP KEY

            }
            @Override
            public void onFailure(int statusCode, Header[] headers, Throwable throwable, JSONObject errorResponse){
                String test =new String();

            }
        });
    }

    public static void getRecipySimple(String[] arrayParams,  final LoginActivity test) throws JSONException {
        RequestParams params = new RequestParams();
        //params.put("id", 1);
        httpConnexionManager.get("api/recipe", params, new JsonHttpResponseHandler() {
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

    public static  void getRecipyHome(final MainPage page) throws JSONException {
        RequestParams params = new RequestParams();
        //TODO CREATE PARAMS FOR RECIPY HOME
        httpConnexionManager.get("api/home", params, new JsonHttpResponseHandler() {
            @Override
            public void onSuccess(int statusCode, Header[] headers, JSONObject response) {
                // If the response is JSONObject instead of expected JSONArray
            }

            @Override
            public void onSuccess(int statusCode, Header[] headers, JSONArray response) {
                //if the response is a JSON ARRAY
               page.affHome(response);
            }
        });
    }


}

