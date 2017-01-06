package com.example.tchaokko.foodheaven;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.LinearLayoutCompat;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.LinearLayout;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.ByteArrayInputStream;

public class Recipy extends AppCompatActivity {
    LinearLayout root;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_recipy);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

    }

    public void createRecipy(JSONArray array) {
        root = (LinearLayout)findViewById(R.id.RecipyLayout);
       for (int count = 0; count < array.length(); count++ ){
           try {
               createBlockRecipy(array.getJSONObject(count));
           } catch (JSONException e) {
               e.printStackTrace();
           }
       }
    }

    private void createBlockRecipy(JSONObject obj) {

    }

    private Bitmap convertImage(byte[] test){
        Bitmap tgtImg = BitmapFactory.decodeByteArray(test,0,test.length);
        return tgtImg;
    }
}
