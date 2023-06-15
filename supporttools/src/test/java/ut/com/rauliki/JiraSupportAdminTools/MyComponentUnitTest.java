package ut.com.rauliki.JiraSupportAdminTools;

import org.junit.Test;
import com.rauliki.JiraSupportAdminTools.MyPluginComponent;
import com.rauliki.JiraSupportAdminTools.MyPluginComponentImpl;

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