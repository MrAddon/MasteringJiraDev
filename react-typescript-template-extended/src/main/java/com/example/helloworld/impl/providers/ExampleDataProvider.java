package com.example.helloworld.impl.providers;

import com.atlassian.json.marshal.Jsonable;
import com.atlassian.webresource.api.data.WebResourceDataProvider;
import com.google.gson.Gson;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.Writer;
import java.util.HashMap;
import java.util.Map;

public class ExampleDataProvider implements WebResourceDataProvider {

    public Jsonable get() {
        return new Jsonable() {
            public void write(Writer writer) throws IOException {
                Gson gson = new Gson();
                gson.toJson(sampleData(), Map.class, new PrintWriter(writer));
            }
        };
    }
    public Map<String, Object> sampleData() {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("name", "Fido");
        map.put("species", "Canine");
        map.put("breed", "Shiba Inu");
        return map;
    }
}
