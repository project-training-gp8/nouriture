package com.example.tchaokko.foodheaven;

/**
 * Created by Tchaokko on 04/01/2017.
 */

import android.preference.PreferenceActivity;

import com.loopj.android.http.*;
import com.loopj.android.http.AsyncHttpClient;
import com.loopj.android.http.AsyncHttpResponseHandler;
import android.preference.PreferenceActivity.Header;


public class httpConnexionManager {
    private static final String BASE_URL = "https://otatsumi.synology.me";
    private static AsyncHttpClient client =  new AsyncHttpClient();


    public static void get(String url, RequestParams params, AsyncHttpResponseHandler responseHandler){
        client.get(getAbsoluteUtl(url), params, responseHandler);
    }

    public static void post(String url, RequestParams params, AsyncHttpResponseHandler responseHandler){
        client.post(getAbsoluteUtl(url),params, responseHandler);
    }

    private static String getAbsoluteUtl(String url) {
        return BASE_URL + url;
    }
}
