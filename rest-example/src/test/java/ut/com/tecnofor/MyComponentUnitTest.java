package ut.com.tecnofor;

import org.junit.Test;
import com.tecnofor.api.MyPluginComponent;
import com.tecnofor.impl.MyPluginComponentImpl;

import static org.junit.Assert.assertEquals;

public class MyComponentUnitTest
{
    @Test
    public void testMyName()
    {
        MyPluginComponent component = new MyPluginComponentImpl(null);
        assertEquals("names do not match!", "myComponent",component.getName());
    }
}