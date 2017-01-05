package com.example.tchaokko.foodheaven;

import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v4.app.DialogFragment;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.DatePicker;
import android.widget.EditText;

import org.json.JSONException;
import org.json.JSONObject;

public class RegisterActivity2 extends AppCompatActivity {
    EditText email;
    EditText password ;
    EditText confirmPassword ;
    EditText firstName ;
    EditText lastName ;
    String hashedpwd;
    int year = -1;
    int month = -1;
    int day = -1;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register2);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG)
                        .setAction("Action", null).show();

            }
        });
    }

    public void fillDateBirthday(DatePicker date){
        this.year = date.getYear();
        this.month = date.getMonth();
        this.day = date.getDayOfMonth();
    }

    public void showDatePickerDialog(View v) {
        DialogFragment newFragment = new DatePickerFragment();
        newFragment.show(getSupportFragmentManager(), "datePicker");
    }

    public void launchRegistration(View v) {
        email = (EditText)findViewById(R.id.Email);
        password = (EditText)findViewById(R.id.Password);
        confirmPassword = (EditText)findViewById(R.id.confirmPassworrd);
        firstName = (EditText)findViewById(R.id.FistName);
        lastName = (EditText)findViewById(R.id.LastName);
        if (!checkInfoRegistration()){
            return;
        }
        JSONObject obj = new JSONObject();
        try {
            obj.put("firstName", firstName.getText().toString());
            obj.put("lastName", lastName.getText().toString());
            obj.put("email", email.getText().toString());
            obj.put("pwd",hashedpwd);
            ApiClassUsage.FirstConnexion(obj);
        }
        catch(JSONException e){

        }
    }

    private boolean checkInfoRegistration() {
        if (!checkpassword()){
            //TODO aff error password
            return false;
        }
        if (email.getText().length() < 1
                || firstName.getText().length() < 1
                || lastName.getText().length() < 1
                || this.year == -1
                || this.month == -1
                || this.day == -1){
            //TODO aff error registration
            return false;
        }
        return true;
    }

    private boolean checkpassword() {
        String pass = password.getText().toString();
        String confPass = confirmPassword.getText().toString();
        if (pass.contentEquals(confPass) && pass.length() > 6){
            hashedpwd = HashMd5.md5(pass);
            return true;
        }
        return false;
    }
}
