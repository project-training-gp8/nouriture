package com.example.tchaokko.foodheaven;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.LinearLayoutCompat;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.View;
import android.view.Window;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedInputStream;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.net.URLConnection;

public class Recipy extends AppCompatActivity {
    LinearLayout root;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_recipy);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        try {
            JSONObject obj =  new JSONObject(getIntent().getStringExtra("Json"));
            createRecipy(obj);
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    public void createRecipy(JSONObject obj) {
        root = (LinearLayout)findViewById(R.id.RecipyLayout);
        ImageView imageRecipy =  (ImageView)findViewById(R.id.RecipyImage);
        TextView textView = (TextView)findViewById(R.id.DescriptionRecipy);
        try {
            String stringImage =  obj.getString("image");
            textView.setText(obj.getString("desc"));
            setTitle(obj.getString("name"));
            JSONArray arrJson = obj.getJSONArray("directions");
            new DownloadImageTask((ImageView)findViewById(R.id.RecipyImage)).execute(stringImage);
            for (int count = 0; count < arrJson.length();count++ ){
                createBlockRecipy(arrJson.getJSONObject(count));
            }
        } catch (JSONException e) {
            e.printStackTrace();
        };

    }

    private void createBlockRecipy(JSONObject obj) {
        LinearLayout myRoot = (LinearLayout)findViewById(R.id.RecipyLayout);
        ImageView imageDirection = new ImageView(this);
        LinearLayout direction = new LinearLayout(this);
        TextView titleView = new TextView(this);
        TextView texteView = new TextView(this);
        direction.setOrientation(LinearLayout.HORIZONTAL);
        try {
            Bitmap img = getImageBitmap(obj.getString("image"));
            imageDirection.setImageBitmap(img);
            String title = obj.getString("title");
            String text =  obj.getString("text");
            titleView.setText(title);
            texteView.setText(text);
            direction.addView(imageDirection);
            direction.addView(titleView);
            direction.addView(texteView);
            myRoot.addView(imageDirection);
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    private Bitmap getImageBitmap(String url) {
        Bitmap bm = null;
        try {
            URL aURL = new URL(url);
            URLConnection conn = aURL.openConnection();
            conn.connect();
            InputStream is = conn.getInputStream();
            BufferedInputStream bis = new BufferedInputStream(is);
            bm = BitmapFactory.decodeStream(bis);
            bis.close();
            is.close();
        } catch (IOException e) {
        }
        return bm;
    }
}
